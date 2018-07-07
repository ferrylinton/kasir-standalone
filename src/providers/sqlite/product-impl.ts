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
    throw new Error("Method not implemented.");
  }
  findByCategory(category: string, pageable: Pageable): Observable<Page<Product>> {
    throw new Error("Method not implemented.");
  }
  countByCategory(category: string): Observable<number> {
    throw new Error("Method not implemented.");
  }
  findByCategoryAndName(category: string, name: string, pageable: Pageable): Observable<Page<Product>> {
    throw new Error("Method not implemented.");
  }
  save(data: Product): Observable<Product> {
    throw new Error("Method not implemented.");
  }
  update(data: Product): Observable<Product> {
    throw new Error("Method not implemented.");
  }
  delete(id: any): Observable<any> {
    throw new Error("Method not implemented.");
  }
  
  
  
  
}
