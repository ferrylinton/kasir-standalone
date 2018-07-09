import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { BaseDb } from '../db/base-db';
import { OrderProvider } from '../order/order';
import { Order } from '../../models/order.model';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';
import { Item } from '../../models/item.model';


@Injectable()
export class OrderProviderImpl extends BaseDb implements OrderProvider {

  private FIND_BY_DATE: string = `SELECT ord.*, itm.quantity, itm.product_name 
                                    FROM t_order ord
                                    LEFT JOIN t_item itm ON ord.id = itm.order_id
                                    WHERE date(ord.created_date) = date(?)`;

  private COUNT_BY_DATE: string = `SELECT count(1) as total FROM t_order where date(created_date) = date(?)`;

  private INSERT_ORDER: string = `INSERT INTO 
                                    t_order (id, transaction_number, paid, canceled, created_by, created_date) 
                                    VALUES (?, ?, ?, ?, ?, datetime('now','localtime'))`;

  private UPDATE_ORDER: string = `UPDATE t_order SET
                                    transaction_number = ?, 
                                    paid = ?,
                                    canceled = ?, 
                                    last_modified_by = ?, 
                                    last_modified_date = datetime('now','localtime') 
                                    WHERE id = ?`;

  private DELETE_ORDER: string = 'DELETE FROM t_order WHERE id=?';

  private INSERT_ORDER_ITEM: string = `INSERT INTO 
                                        t_item (id, quantity, product_id, order_id)
                                        VALUES (?, ?, ?, ?)`;

  private DELETE_ORDER_ITEM: string = 'DELETE FROM t_item WHERE order_id=?';

  constructor(public sqlite: SQLite) {
    super(sqlite);
  }

  findByDate(date: Date, pageable: Pageable): Observable<Page<Order>> {
    throw new Error("Method not implemented.");
  }

  save(data: Order): Observable<Order> {
    return fromPromise(this.connect().then(db => this.executeSqlSave(db, data)));
  }

  update(data: Order): Observable<Order> {
    return fromPromise(this.connect().then(db => this.executeSqlUpdate(db, data)));
  }

  delete(id: any): Observable<any> {
    return fromPromise(this.connect().then(db => this.executeSqlDelete(db, id)));
  }

  private executeSqlCountByDate(db: any, date: Date, pageable: Pageable): Promise<any> {
    return new Promise((resolve, reject) => {
      db.executeSql(this.COUNT_BY_DATE, [date]).then((data) => {
        pageable.totalData = data.rows.item(0)['total']
        resolve({ db: db, pageable: pageable });
      }).catch((error) => {
        reject(error);
      });
    })
  }

  private executeSqlFindByDate(db: any, date: Date, pageable: Pageable): Promise<Page<Order>> {
    return new Promise((resolve, reject) => {
      let limit: number = pageable.size;
      let offset: number = (pageable.pageNumber - 1) * pageable.size;
      let orderBy: string = pageable.sort.column + pageable.sort.isAsc ? ' ASC' : ' DESC';

      db.executeSql(this.FIND_BY_DATE, [date, orderBy, limit, offset]).then((data) => {
        let orders: Array<Order> = new Array();
        let order: Order;

        for (let i: number = 0; i < data.rows.length; i++) {
          orders.push(this.convertToOrder(data.rows.item(i)));

          if(!order){
            order = this.convertToOrder(data.rows.item(i));
            order.items.push(this.convertToItem(data.rows.item(i)))
          }else if(order['id'] != data.rows.item(i)['id']){
            order.items.push(this.convertToItem(data.rows.item(i)))
            orders.push(order);
            order.items.push(this.convertToItem(data.rows.item(i)))
          }else if(order['id'] != data.rows.item(i)['id']){
            order.items.push(this.convertToItem(data.rows.item(i)))
          }
        }

        resolve(new Page(orders, pageable.pageNumber, pageable.totalData, pageable.sort));
      }).catch((error) => {
        reject(error);
      });
    })
  }

  private executeSqlSave(db: any, order: Order): Promise<any> {
    let params = [order.id, order.transactionNumber, order.paid, order.canceled, order.createdBy];
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {

        tx.executeSql(this.DELETE_ORDER_ITEM, [order.id]);
        for(let i:number=0; i<order.items.length; i++){
          let item: Item = order.items[i];
          tx.executeSql(this.INSERT_ORDER_ITEM, [item.id, item.quantity, item.product, order.id]);
        }

        tx.executeSql(this.INSERT_ORDER, [order.id, order.transactionNumber, order.paid, order.canceled, order.createdBy]);

      }).then((result) => {
        resolve('Order [' + order.id + '] is deleted successfully');
      }).catch((error) => {
        reject(error);
      });
    });
  }

  private executeSqlUpdate(db: any, order: Order): Promise<any> {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {

        tx.executeSql(this.DELETE_ORDER_ITEM, [order.id]);
        for(let i:number=0; i<order.items.length; i++){
          let item: Item = order.items[i];
          tx.executeSql(this.INSERT_ORDER_ITEM, [item.id, item.quantity, item.product, order.id]);
        }

        tx.executeSql(this.UPDATE_ORDER, [order.transactionNumber, order.paid, order.canceled, order.lastModifiedBy, order.id]);

      }).then((result) => {
        resolve('Order [' + order.id + '] is deleted successfully');
      }).catch((error) => {
        reject(error);
      });
    });
  }

  private executeSqlDelete(db: any, id: String): Promise<any> {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {

        tx.executeSql(this.DELETE_ORDER_ITEM, [id]);
        tx.executeSql(this.DELETE_ORDER, [id]);

      }).then((result) => {
        resolve('Order [' + id + '] is deleted successfully');
      }).catch((error) => {
        reject(error);
      });
    });
  }

  private convertToOrder(item: any): Order {
    return new Order(
      item['id'],
      item['transaction_number'],
      new Array(),
      item['paid'],
      item['canceled'],
      item['created_by'],
      item['created_date'],
      item['last_modified_by'],
      item['last_modified_date']
    );
  }

  private convertToItem(item: any): Item {
    return new Item(
      item['id'],
      item['product_name'],
      item['quantity']
    );
  }

}
