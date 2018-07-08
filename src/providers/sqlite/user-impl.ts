import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { BaseDb } from '../db/base-db';
import { UserProvider } from '../user/user';
import { User } from '../../models/user.model';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';



@Injectable()
export class UserProviderImpl extends BaseDb implements UserProvider {

  constructor(public sqlite: SQLite) {
    super(sqlite);
  }
  
  findByUsername(username: string): Observable<User> {
    return fromPromise(this.connect()
    .then(db => this.executeSqlFindByUsername(db, username)));
  }

  findByFullname(fullname: string, pageable: Pageable): Observable<Page<User>> {
    return fromPromise(this.connect()
      .then(db => this.executeSqlCountByFullname(db, fullname, pageable))
      .then(result => this.executeSqlFindByFullname(result.db, fullname, result.pageable)));
  }

  save(data: User): Observable<User> {
    return fromPromise(this.connect().then(db => this.executeSqlSave(db, data)));
  }

  update(data: User): Observable<User> {
    return fromPromise(this.connect().then(db => this.executeSqlUpdate(db, data)));
  }

  delete(id: any): Observable<any> {
    return fromPromise(this.connect().then(db => this.executeSqlDelete(db, id)));
  }
 
  private executeSqlFindByUsername(db: any, username: string): Promise<User> {
    let query = `SELECT usr.*, rla.authority_name 
    FROM mst_user usr
    LEFT JOIN mst_role_authority rla ON rla.role_name = usr.role_name
    LEFT JOIN mst_authority aut ON aut.name = rla.authority_name 
    WHERE usr.username = ? `;
    return new Promise((resolve, reject) => {
      
      db.executeSql(query, [username]).then((data) => {
        let user: User;

        for (let i: number = 0; i < data.rows.length; i++) {
          if(!user){
            user = this.convertToUser(data.rows.item(0));
          }
          
          user.authorities.push(data.rows.item(i)['authority_name'])
        }
        resolve(user);
        
      }).catch((error) => {
        reject(error);
      });
    })
  }

  private executeSqlCountByFullname(db: any, fullname: string, pageable: Pageable): Promise<any> {
    let query = 'SELECT count(1) as total FROM mst_user where lower(fullname) LIKE ? ';
    return new Promise((resolve, reject) => {
      fullname = '%' + fullname.toLowerCase() + '%';

      db.executeSql(query, [fullname]).then((data) => {
        pageable.totalData = data.rows.item(0)['total']
        resolve({ db: db, pageable: pageable });
      }).catch((error) => {
        reject(error);
      });
    })
  }

  private executeSqlFindByFullname(db: any, fullname: string, pageable: Pageable): Promise<Page<User>> {
    let query = 'SELECT * FROM mst_user where lower(fullname) LIKE ? ORDER BY ? LIMIT ? OFFSET ? ';;
    return new Promise((resolve, reject) => {
      fullname = '%' + fullname.toLowerCase() + '%';
      let limit: number = pageable.size;
      let offset: number = (pageable.pageNumber - 1) * pageable.size;
      let orderBy: string = pageable.sort.column + pageable.sort.isAsc ? ' ASC' : ' DESC';

      db.executeSql(query, [fullname, orderBy, limit, offset]).then((data) => {
        let products: Array<User> = new Array();

        for (let i: number = 0; i < data.rows.length; i++) {
          products.push(this.convertToUser(data.rows.item(i)));
        }

        resolve(new Page(products, pageable.pageNumber, pageable.totalData, pageable.sort));
      }).catch((error) => {
        reject(error);
      });
    })
  }

  private executeSqlSave(db: any, user: User): Promise<any> {
    let params = [user.id, user.username, user.password, user.fullname, user.role, user.activated, user.image, user.createdBy];
    let query = `INSERT INTO 
    mst_user(id, username, password, fullname, role_name, activated, image, created_by, created_date) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now','localtime'))`;
    
    return this.executeSql(db, query, params);
  }

  private executeSqlUpdate(db: any, user: User): Promise<any> {
    let params = [user.username, user.password, user.fullname, user.role, user.activated, user.image, user.lastModifiedBy, user.id];
    let query = `UPDATE mst_user SET 
    username = ?,
    password = ?,
    fullname = ?, 
    role_name = ?, 
    activated = ?,
    image = ?,
    last_modified_by = ?, 
    last_modified_date = datetime('now','localtime')
    WHERE id = ?`;
    
    return this.executeSql(db, query, params);
  }

  private executeSqlDelete(db: any, id: String): Promise<any> {
    let params = [id];
    let query = 'DELETE FROM mst_user WHERE id=?';
    return this.executeSql(db, query, params);
  }

  private convertToUser(item: any): User {
    return new User(
      item['id'],
      item['username'],
      item['password'],
      item['fullname'],
      item['role_name'],
      new Array(),
      item['activated'],
      item['image'],
      item['created_by'],
      item['created_date'],
      item['last_modified_by'],
      item['last_modified_date']
    );
  }

  
}
