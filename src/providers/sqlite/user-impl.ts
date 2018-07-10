import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

import * as USER from './user-query';
import { BaseSQlite } from './base';
import { UserProvider } from '../user/user';
import { User } from '../../models/user.model';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';


@Injectable()
export class UserProviderImpl extends BaseSQlite implements UserProvider {

  constructor(public sqlite: SQLite, public storage: Storage) {
    super(sqlite, storage);
  }
  
  findByUsername(username: string): Observable<User> {
    return fromPromise(this.connect()
    .then(() => this.executeSqlFindByUsername(username)));
  }

  findByFullname(fullname: string, pageable: Pageable): Observable<Page<User>> {
    return fromPromise(this.connect()
      .then(() => this.executeSqlCountByFullname(fullname, pageable))
      .then(pageable => this.executeSqlFindByFullname(fullname, pageable)));
  }

  save(user: User): Observable<User> {
    let params = [user.id, user.username, user.password, user.fullname, user.role, user.activated, user.image, user.createdBy];
    return fromPromise(this.connect().then(() => this.executeSql(USER.INSERT, params)));
  }

  update(user: User): Observable<User> {
    let params = [user.username, user.password, user.fullname, user.role, user.activated, user.image, user.lastModifiedBy, user.id];
    return fromPromise(this.connect().then(() => this.executeSql(USER.UPDATE, params)));
  }

  delete(id: any): Observable<any> {
    return fromPromise(this.connect().then(() => this.executeSql(USER.DELETE, [id])));
  }
 
  private executeSqlFindByUsername(username: string): Promise<User> {
    return new Promise((resolve, reject) => {
      
      this.db.executeSql(USER.FIND_BY_USERNAME, [username]).then((data) => {
        let user: User;

        for (let i: number = 0; i < data.rows.length; i++) {
          if(!user){
            user = this.convertToUser(data.rows.item(0));
            user.role = this.convertToRole(data.rows.item(0));
          }
          user.role.authorities.push(this.convertToAuthority(data.rows.item(0)))
        }

        resolve(user);
      }).catch((error) => {
        reject(error);
      });
    })
  }

  private executeSqlCountByFullname(fullname: string, pageable: Pageable): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.executeSql(USER.COUNT_BY_FULLNAME, ['%' + fullname.toLowerCase() + '%']).then((data) => {
        pageable.totalData = data.rows.item(0)['total']
        resolve(pageable);
      }).catch((error) => {
        reject(error);
      });
    })
  }

  private executeSqlFindByFullname(fullname: string, pageable: Pageable): Promise<Page<User>> {
    return new Promise((resolve, reject) => {
      let params = this.createParams(['%' + fullname.toLowerCase() + '%'], pageable);

      this.db.executeSql(USER.FIND_BY_FULLNAME, params).then((data) => {
        let users: Array<User> = new Array();
        let user: User;

        for (let i: number = 0; i < data.rows.length; i++) {
          if(!user){
            user = this.convertToUser(data.rows.item(i));
          }else if(user.id != data.rows.item(i)['user_id']){
            // insert user to array
            users.push(user);

            // create new user
            user = this.convertToUser(data.rows.item(i));
            user.role.authorities.push(this.convertToAuthority(data.rows.item(i)));
          }else if(user.id == data.rows.item(i)['user_id']){
            user.role.authorities.push(this.convertToAuthority(data.rows.item(i)));
          }
        }
        // insert user to array
        users.push(user);
        
        resolve(new Page(users, pageable.pageNumber, pageable.totalData, pageable.sort));
      }).catch((error) => {
        reject(error);
      });
    })
  }
  
}
