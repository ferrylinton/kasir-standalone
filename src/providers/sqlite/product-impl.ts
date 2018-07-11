import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

import * as PRODUCT from './product-query';
import { BaseSQlite } from './base';
import { ProductProvider } from '../product/product';
import { Product } from '../../models/product.model';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';


@Injectable()
export class ProductProviderImpl extends BaseSQlite implements ProductProvider {

  constructor(public sqlite: SQLite, public storage: Storage) {
    super(sqlite, storage);
  }

  findByName(name: string, pageable: Pageable): Observable<Page<Product>> {
    return fromPromise(this.connect()
      .then(() => this.executeSqlCountByName(name, pageable))
      .then(pageable => this.executeSqlFindByName(name, pageable)));
  }

  findByCategory(categoryId: string, pageable: Pageable): Observable<Page<Product>> {
    return fromPromise(this.connect()
      .then(() => this.executeSqlCountByCategory(categoryId, pageable))
      .then(pageable => this.executeSqlFindByCategory(categoryId, pageable)));
  }

  save(product: Product): Observable<Product> {
    let categoryId = (typeof product.category === 'string') ? product.category : product.category.id;
    let params = [product.id, product.name, product.description, product.price, product.image, categoryId, this.LOGGED_USER.id];
    return fromPromise(this.connect()
      .then(() => this.executeSql(PRODUCT.INSERT, params)));
  }

  update(product: Product): Observable<Product> {
    let categoryId = (typeof product.category === 'string') ? product.category : product.category.id;
    let params = [product.name, product.description, product.price, product.image, categoryId, this.LOGGED_USER.id, product.id];
    return fromPromise(this.connect()
      .then(() => this.executeSql(PRODUCT.UPDATE, params)));
  }

  delete(id: any): Observable<any> {
    return fromPromise(this.connect()
      .then(() => this.executeSql(PRODUCT.DELETE, [id])));
  }

  private executeSqlCountByName(name: string, pageable: Pageable): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.executeSql(PRODUCT.COUNT_BY_NAME, ['%' + name.toLowerCase() + '%']).then((data) => {
        pageable.totalData = data.rows.item(0)['total']
        resolve(pageable);
      }).catch((error) => {
        reject(error);
      });
    })
  }

  private executeSqlCountByCategory(categoryId: string, pageable: Pageable): Promise<any> {
    let params = (categoryId == '') ? [] : [categoryId];
    let query = (categoryId == '') ? PRODUCT.COUNT : PRODUCT.COUNT_BY_CATEGORY;

    return new Promise((resolve, reject) => {
      this.db.executeSql(query, params).then((data) => {
        pageable.totalData = data.rows.item(0)['total']
        resolve(pageable);
      }).catch((error) => {
        reject(error);
      });
    })
  }

  private executeSqlFindByName(name: string, pageable: Pageable): Promise<Page<Product>> {
    let params = this.createParams(['%' + name.toLowerCase() + '%'], pageable);

    return new Promise((resolve, reject) => {
      this.db.executeSql(PRODUCT.FIND_BY_NAME, params).then((data) => {
        resolve(new Page(this.convertToProducts(data), pageable.pageNumber, pageable.totalData, pageable.sort));
      }).catch((error) => {
        reject(error);
      });
    })
  }

  private executeSqlFindByCategory(categoryId: string, pageable: Pageable): Promise<Page<Product>> {
    let params = (categoryId == '') ? this.createParams([], pageable) : this.createParams([categoryId], pageable);
    let query = (categoryId == '') ? PRODUCT.FIND : PRODUCT.FIND_BY_CATEGORY;
    
    return new Promise((resolve, reject) => {
      this.db.executeSql(query, params).then((data) => {
        resolve(new Page(this.convertToProducts(data), pageable.pageNumber, pageable.totalData, pageable.sort));
      }).catch((error) => {
        reject(error);
      });
    })
  }

  private convertToProducts(data: any) {
    let products: Array<Product> = new Array();

    for (let i: number = 0; i < data.rows.length; i++) {
      products.push(this.convertToProduct(data.rows.item(i)));
    }

    return products;
  }

}
