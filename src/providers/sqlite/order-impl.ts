import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { BaseDb } from '../db/base-db';
import { OrderProvider } from '../order/order';
import { Order } from '../../models/order.model';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';


@Injectable()
export class OrderProviderImpl extends BaseDb implements OrderProvider {

  constructor(public sqlite: SQLite) {
    super(sqlite);
  }

  findByDate(date: Date, pageable: Pageable): Observable<Page<Order>> {
    throw new Error("Method not implemented.");
  }
  findBetweenDate(startDate: Date, endDate: Date, pageable: Pageable): Observable<Page<Order>> {
    throw new Error("Method not implemented.");
  }
  save(data: Order): Observable<Order> {
    throw new Error("Method not implemented.");
  }
  update(data: Order): Observable<Order> {
    throw new Error("Method not implemented.");
  }
  delete(id: any): Observable<any> {
    throw new Error("Method not implemented.");
  }



}
