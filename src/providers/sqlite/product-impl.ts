import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

import * as PRODUCT from '../../constant/query-product';
import { BaseSQlite } from './base';
import { ProductProvider } from '../product/product';
import { Product } from '../../models/product.model';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';
import { Category } from '../../models/category.model';


@Injectable()
export class ProductProviderImpl extends BaseSQlite implements ProductProvider {

  constructor(public sqlite: SQLite) {
    super(sqlite);
  }

  findByName(name: string, pageable: Pageable): Observable<Page<Product>> {
    return fromPromise(this.connect()
      .then(() => this.executeSqlCountByName(name, pageable))
      .then(pageable => this.executeSqlFindByName(name, pageable)));
  }

  findByCategory(category: string, pageable: Pageable): Observable<Page<Product>> {
    return fromPromise(this.connect()
      .then(() => this.executeSqlCountByCategory(category, pageable))
      .then(pageable => this.executeSqlFindByCategory(category, pageable)));
  }

  save(product: Product): Observable<Product> {
    let params = [product.id, product.name, product.description, product.price, product.image, product.category, product.createdBy];
    return fromPromise(this.connect()
      .then(() => this.executeSql(PRODUCT.INSERT, params)));
  }

  update(product: Product): Observable<Product> {
    let params = [product.name, product.description, product.price, product.image, product.category.id, product.lastModifiedBy, product.id];
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
    let query = (categoryId == '') ? PRODUCT.COUNT : PRODUCT.COUNT_BY_NAME;

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
    let query = (categoryId == '') ? PRODUCT.FIND : PRODUCT.FIND_BY_NAME;
    
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

  private convertToProduct(item: any): Product {
    return new Product(
      item['id'],
      item['name'],
      item['description'],
      item['price'],
      item['image'],
      this.convertToCategory(item),
      item['created_by'],
      item['created_date'],
      item['last_modified_by'],
      item['last_modified_date']
    );
  }

  private convertToCategory(item: any): Category {
    return new Category(
      item['category_id'],
      item['category_name'],
      item['category_description'],
      item['category_image'],
      item['category_created_by'],
      item['category_created_date'],
      item['category_last_modified_by'],
      item['category_last_modified_date']
    );
  }

}
