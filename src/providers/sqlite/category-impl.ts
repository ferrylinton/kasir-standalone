import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { BaseDb } from '../db/base-db';
import { CategoryProvider } from '../../providers/category/category';
import { Category } from '../../models/category.model';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';


@Injectable()
export class CategoryProviderImpl extends BaseDb implements CategoryProvider {

  constructor(public sqlite: SQLite) {
    super(sqlite);
  }

  findAll(): Observable<Array<Category>> {
    return fromPromise(this.connect().then(db => this.executeSqlFindAll(db)));
  }

  findByName(name: string, pageable: Pageable): Observable<Page<Category>> {
    return fromPromise(this.connect()
      .then(db => this.executeSqlCountByName(db, name, pageable))
      .then(result => this.executeSqlFindByName(result.db, result.total, name, pageable)));
  }

  save(data: Category): Observable<Category> {
    return fromPromise(this.connect().then(db => this.executeSqlSave(db, data)));
  }

  update(data: Category): Observable<Category> {
    return fromPromise(this.connect().then(db => this.executeSqlUpdate(db, data)));
  }

  delete(id: string): Observable<Category> {
    return fromPromise(
      this.connect().then(db => this.executeSqlDelete(db, id)));
  }

  private executeSqlFindAll(db: any): Promise<Array<Category>> {
    let query = 'SELECT * FROM mst_category ORDER BY name';

    return new Promise((resolve, reject) => {
      db.executeSql(query, []).then((data) => {
        let currencies: Array<Category> = new Array();

        for (let i: number = 0; i < data.rows.length; i++) {
          currencies.push(this.convertToCategory(data.rows.item(i)));
        }

        resolve(currencies);
      }).catch((error) => {
        reject(error);
      })
    });
  }

  private executeSqlCountByName(db: any, name: string, pageable: Pageable): Promise<any> {
    let query = 'SELECT count(1) as total FROM mst_category where lower(name) LIKE ? ';
    return new Promise((resolve, reject) => {
      name = '%' + name.toLowerCase() + '%';

      db.executeSql(query, [name]).then((data) => {
        resolve({ db: db, total: data.rows.item(0)['total'] });
      }).catch((error) => {
        reject(error);
      });
    })
  }

  private executeSqlFindByName(db: any, total: number, name: string, pageable: Pageable): Promise<Page<Category>> {
    let query = 'SELECT * FROM mst_category where lower(name) LIKE ? ORDER BY ? LIMIT ? OFFSET ? ';;
    return new Promise((resolve, reject) => {
      name = '%' + name.toLowerCase() + '%';
      let limit: number = pageable.size;
      let offset: number = (pageable.pageNumber - 1) * pageable.size;
      let orderBy: string = pageable.sort.column + pageable.sort.isAsc ? ' ASC' : ' DESC';

      db.executeSql(query, [name, orderBy, limit, offset]).then((data) => {
        let currencies: Array<Category> = new Array();

        for (let i: number = 0; i < data.rows.length; i++) {
          currencies.push(this.convertToCategory(data.rows.item(i)));
        }

        resolve(new Page(currencies, pageable.pageNumber, total, pageable.sort));
      }).catch((error) => {
        reject(error);
      });
    })
  }

  private executeSqlSave(db: any, category: Category): Promise<any> {
    let params = [category.id, category.name, category.description, category.image, category.createdBy];
    let query = `INSERT INTO 
    mst_category(id, name, description, image, created_by, created_date) 
    VALUES (?, ?, ?, ?, ?, datetime('now','localtime'))`;
    
    return this.executeSql(db, query, params);
  }

  private executeSqlUpdate(db: any, category: Category): Promise<any> {
    let params = [category.name, category.description, category.image, category.createdBy, category.id];
    let query = `UPDATE mst_category SET 
    name = ?, 
    description = ?, 
    image = ?,
    last_modified_by = ?, 
    last_modified_date = datetime('now','localtime')
    WHERE id = ?`;
    
    return this.executeSql(db, query, params);
  }

  private executeSqlDelete(db: any, id: String): Promise<any> {
    let params = [id];
    let query = 'DELETE FROM mst_category WHERE id=?';
    return this.executeSql(db, query, params);
  }

  private convertToCategory(item: any): Category {
    return new Category(
      item['id'],
      item['name'],
      item['description'],
      item['image'],
      item['created_by'],
      item['created_date'],
      item['last_modified_by'],
      item['last_modified_date']
    );
  }
}
