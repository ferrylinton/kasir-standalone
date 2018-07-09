import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

import * as CATEGORY from './category-query';
import { BaseSQlite } from './base';
import { CategoryProvider } from '../../providers/category/category';
import { Category } from '../../models/category.model';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';


@Injectable()
export class CategoryProviderImpl extends BaseSQlite implements CategoryProvider {

  constructor(public sqlite: SQLite) {
    super(sqlite);
  }

  findAll(): Observable<Array<Category>> {
    return fromPromise(this.connect().then(() => this.executeSqlFindAll()));
  }

  findByName(name: string, pageable: Pageable): Observable<Page<Category>> {
    return fromPromise(this.connect()
      .then(() => this.executeSqlCountByName(name, pageable))
      .then(pageable => this.executeSqlFindByName(name, pageable)));
  }

  save(category: Category): Observable<Category> {
    let params = [category.id, category.name, category.description, category.image, category.createdBy];
    
    return fromPromise(this.connect()
      .then(() => this.executeSql(CATEGORY.INSERT, params)));
  }

  update(category: Category): Observable<Category> {
    let params = [category.name, category.description, category.image, category.lastModifiedBy, category.id];
    
    return fromPromise(this.connect()
      .then(() => this.executeSql(CATEGORY.UPDATE, params)));
  }

  delete(id: string): Observable<Category> {
    return fromPromise(this.connect()
      .then(() => this.executeSql(CATEGORY.DELETE, [id])));
  }

  private executeSqlFindAll(): Promise<Array<Category>> {
    return new Promise((resolve, reject) => {
      this.db.executeSql(CATEGORY.FIND_ALL, []).then((data) => {
        resolve(this.convertToCategories(data));
      }).catch((error) => {
        reject(error);
      })
    });
  }

  private executeSqlCountByName(name: string, pageable: Pageable): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.executeSql(CATEGORY.COUNT_BY_NAME, ['%' + name.toLowerCase() + '%']).then((data) => {
        pageable.totalData = data.rows.item(0)['total']
        resolve(pageable);
      }).catch((error) => {
        reject(error);
      });
    })
  }

  private executeSqlFindByName(name: string, pageable: Pageable): Promise<Page<Category>> {
    let params = this.createParams(['%' + name.toLowerCase() + '%'], pageable);

    return new Promise((resolve, reject) => {
      this.db.executeSql(CATEGORY.FIND_BY_NAME, params).then((data) => {
        resolve(new Page(this.convertToCategories(data), pageable.pageNumber, pageable.totalData, pageable.sort));
      }).catch((error) => {
        reject(error);
      });
    })
  }

  private convertToCategories(data: any): Array<Category> {
    let categories: Array<Category> = new Array();

    for (let i: number = 0; i < data.rows.length; i++) {
      categories.push(this.convertToCategory(data.rows.item(i)));
    }

    return categories;
  }

}
