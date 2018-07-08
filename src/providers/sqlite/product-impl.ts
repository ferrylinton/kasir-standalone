import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { BaseDb } from '../db/base-db';
import { ProductProvider } from '../product/product';
import { Product } from '../../models/product.model';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';


@Injectable()
export class ProductProviderImpl extends BaseDb implements ProductProvider {

  constructor(public sqlite: SQLite) {
    super(sqlite);
  }

  findByName(name: string, pageable: Pageable): Observable<Page<Product>> {
    return fromPromise(this.connect()
      .then(db => this.executeSqlCountByName(db, name, pageable))
      .then(result => this.executeSqlFindByName(result.db, name, result.pageable)));
  }

  findByCategory(category: string, pageable: Pageable): Observable<Page<Product>> {
    return fromPromise(this.connect()
      .then(db => this.executeSqlCountByCategory(db, category, pageable))
      .then(result => this.executeSqlFindByCategory(result.db, category, result.pageable)));
  }

  save(data: Product): Observable<Product> {
    return fromPromise(this.connect().then(db => this.executeSqlSave(db, data)));
  }

  update(data: Product): Observable<Product> {
    return fromPromise(this.connect().then(db => this.executeSqlUpdate(db, data)));
  }

  delete(id: any): Observable<any> {
    return fromPromise(this.connect().then(db => this.executeSqlDelete(db, id)));
  }
  
  private executeSqlCountByName(db: any, name: string, pageable: Pageable): Promise<any> {
    let query = 'SELECT count(1) as total FROM mst_product where lower(name) LIKE ? ';
    return new Promise((resolve, reject) => {
      name = '%' + name.toLowerCase() + '%';

      db.executeSql(query, [name]).then((data) => {
        pageable.totalData = data.rows.item(0)['total']
        resolve({ db: db, pageable: pageable });
      }).catch((error) => {
        reject(error);
      });
    })
  }

  private executeSqlCountByCategory(db: any, category: string, pageable: Pageable): Promise<any> {
    let query = 'SELECT count(1) as total FROM mst_product where category_name = ? ';
    return new Promise((resolve, reject) => {
      db.executeSql(query, [category]).then((data) => {
        pageable.totalData = data.rows.item(0)['total']
        resolve({ db: db, pageable: pageable });
      }).catch((error) => {
        reject(error);
      });
    })
  }

  private executeSqlFindByName(db: any, name: string, pageable: Pageable): Promise<Page<Product>> {
    let query = 'SELECT * FROM mst_product where lower(name) LIKE ? ORDER BY ? LIMIT ? OFFSET ? ';;
    return new Promise((resolve, reject) => {
      name = '%' + name.toLowerCase() + '%';
      let limit: number = pageable.size;
      let offset: number = (pageable.pageNumber - 1) * pageable.size;
      let orderBy: string = pageable.sort.column + pageable.sort.isAsc ? ' ASC' : ' DESC';

      db.executeSql(query, [name, orderBy, limit, offset]).then((data) => {
        let products: Array<Product> = new Array();

        for (let i: number = 0; i < data.rows.length; i++) {
          products.push(this.convertToProduct(data.rows.item(i)));
        }

        resolve(new Page(products, pageable.pageNumber, pageable.totalData, pageable.sort));
      }).catch((error) => {
        reject(error);
      });
    })
  }

  private executeSqlFindByCategory(db: any, category: string, pageable: Pageable): Promise<Page<Product>> {
    let query = 'SELECT * FROM mst_product where category_name LIKE ? ORDER BY ? LIMIT ? OFFSET ? ';;
    return new Promise((resolve, reject) => {
      let limit: number = pageable.size;
      let offset: number = (pageable.pageNumber - 1) * pageable.size;
      let orderBy: string = pageable.sort.column + pageable.sort.isAsc ? ' ASC' : ' DESC';

      db.executeSql(query, [name, orderBy, limit, offset]).then((data) => {
        let products: Array<Product> = new Array();

        for (let i: number = 0; i < data.rows.length; i++) {
          products.push(this.convertToProduct(data.rows.item(i)));
        }

        resolve(new Page(products, pageable.pageNumber, pageable.totalData, pageable.sort));
      }).catch((error) => {
        reject(error);
      });
    })
  }

  private executeSqlSave(db: any, product: Product): Promise<any> {
    let params = [product.id, product.name, product.description, product.price, product.image, product.category, product.createdBy];
    let query = `INSERT INTO 
    mst_product(id, name, description, price, image, category_name, created_by, created_date) 
    VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now','localtime'))`;
    
    return this.executeSql(db, query, params);
  }

  private executeSqlUpdate(db: any, product: Product): Promise<any> {
    let params = [product.name, product.description, product.price, product.image, product.category, product.lastModifiedBy, product.id];
    let query = `UPDATE mst_product SET 
    name = ?, 
    description = ?, 
    price = ?,
    image = ?,
    category_name = ?,
    last_modified_by = ?, 
    last_modified_date = datetime('now','localtime')
    WHERE id = ?`;
    
    return this.executeSql(db, query, params);
  }

  private executeSqlDelete(db: any, id: String): Promise<any> {
    let params = [id];
    let query = 'DELETE FROM mst_product WHERE id=?';
    return this.executeSql(db, query, params);
  }

  private convertToProduct(item: any): Product {
    return new Product(
      item['id'],
      item['name'],
      item['description'],
      item['price'],
      item['image'],
      item['category_name'],
      item['created_by'],
      item['created_date'],
      item['last_modified_by'],
      item['last_modified_date']
    );
  }
  
}
