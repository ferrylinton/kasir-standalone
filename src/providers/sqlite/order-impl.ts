import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

import * as ORDER from './order-query';
import * as ORDER_ITEM from './order-item-query';
import { BaseSQlite } from './base';
import { OrderProvider } from '../order/order';
import { Order } from '../../models/order.model';
import { OrderItem } from '../../models/order-item.model';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';


@Injectable()
export class OrderProviderImpl extends BaseSQlite implements OrderProvider {

  constructor(public sqlite: SQLite, public storage: Storage) {
    super(sqlite, storage);
  }

  findByDate(dt: Date, pageable: Pageable): Observable<Page<Order>> {
    let strDate = dt.toISOString().split('T')[0];
    return fromPromise(this.connect()
      .then(() => this.executeSqlCountByDate(strDate, pageable))
      .then(pageable => this.executeSqlFindByDate(strDate, pageable)));
  }

  save(order: Order): Observable<Order> {
    return fromPromise(this.connect().then(db => this.executeSqlSave(order)));
  }

  update(data: Order): Observable<Order> {
    return fromPromise(this.connect().then(() => this.executeSqlUpdate(data)));
  }

  delete(id: any): Observable<any> {
    return fromPromise(this.connect().then(() => this.executeSqlDelete(id)));
  }

  private executeSqlCountByDate(strDate: string, pageable: Pageable): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.executeSql(ORDER.COUNT_BY_DATE, [strDate]).then((data) => {
        pageable.totalData = data.rows.item(0)['total']
        resolve(pageable);
      }).catch((error) => {
        reject(error);
      });
    })
  }

  private executeSqlFindByDate(strDate: string, pageable: Pageable): Promise<Page<Order>> {
    let offset = (pageable.pageNumber - 1) * pageable.size;

    return new Promise((resolve, reject) => {
      this.db.executeSql(ORDER.FIND_BY_DATE, [strDate, offset]).then((data) => {
        let orders: Array<Order> = new Array();
        let order: Order;

        for (let i: number = 0; i < data.rows.length; i++) {
          if(!order){
            order = this.convertToOrder(data.rows.item(i));
            order.orderItems.push(this.convertToOrderItem(data.rows.item(i)))
          }else if(order.id != data.rows.item(i)['order_id']){
            // add order to list
            orders.push(order);

            // create new order
            order = this.convertToOrder(data.rows.item(i));
            order.orderItems.push(this.convertToOrderItem(data.rows.item(i)))
          }else if(order.id == data.rows.item(i)['order_id']){
            order.orderItems.push(this.convertToOrderItem(data.rows.item(i)))
          }
        }
        orders.push(order);

        resolve(new Page(orders, pageable.pageNumber, pageable.totalData));
      }).catch((error) => {
        reject(error);
      });
    })
  }

  private executeSqlSave(order: Order): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {

        // insert new order item
        for(let i:number=0; i<order.orderItems.length; i++){
          let item: OrderItem = order.orderItems[i];
          tx.executeSql(ORDER_ITEM.INSERT, [item.id, order.id, item.product.id, item.quantity, item.price, item.note]);
        }

        // insert new order
        tx.executeSql(ORDER.INSERT, [order.id, order.transactionNumber, order.paid, order.canceled, order.note, this.LOGGED_USER.id]);

      }).then((result) => {
        resolve('Order [' + order.id + '] is deleted successfully');
      }).catch((error) => {
        reject(error);
      });
    });
  }

  private executeSqlUpdate(order: Order): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {

        // delete current order item
        tx.executeSql(ORDER_ITEM.DELETE, [order.id]);

        // insert new order item
        for(let i:number=0; i<order.orderItems.length; i++){
          let item: OrderItem = order.orderItems[i];
          tx.executeSql(ORDER_ITEM.INSERT, [item.id, order.id, item.product.id, item.quantity, item.price, item.note]);
        }

        // update order
        tx.executeSql(ORDER.UPDATE, [order.transactionNumber, order.paid, order.canceled, order.note, this.LOGGED_USER.id, order.id]);

      }).then((result) => {
        resolve('Order [' + order.id + '] is deleted successfully');
      }).catch((error) => {
        reject(error);
      });
    });
  }

  private executeSqlDelete(id: String): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {

        // delete current order item
        tx.executeSql(ORDER_ITEM.DELETE, [id]);

        // delete current order
        tx.executeSql(ORDER.DELETE, [id]);

      }).then((result) => {
        resolve('Order [' + id + '] is deleted successfully');
      }).catch((error) => {
        reject(error);
      });
    });
  }

}
