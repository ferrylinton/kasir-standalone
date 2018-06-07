import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { v4 as uuid } from 'uuid';

import { ORDER } from "../../constant/constant";
import { UtilProvider } from '../../providers/util/util';
import { Order } from "../../models/order.model";
import { Item } from "../../models/item.model";
import { Product } from "../../models/product.model";
import { OrderProvider } from '../order/order';


@Injectable()
export class CartProvider {

  constructor(
    public storage: Storage,
    public util: UtilProvider,
    public orderProvider: OrderProvider
  ) {
  }

  setOrder(order: Order): void {
    this.storage.get(ORDER).then(data => {
      if (data) {
        let currentOrder: Order = JSON.parse(data);
        if(!currentOrder.isPaid){
          this.orderProvider.save(currentOrder);
        }
      }
    });

    this.storage.set(ORDER, JSON.stringify(order));
  }

  getOrder(): Observable<Order> {
    return fromPromise(this.storage.get(ORDER).then((order) => {
      if (order) {
        return JSON.parse(order);
      } else {
        order = new Order(uuid(), this.util.transactionNumber(), new Array<Item>(), false);
        this.storage.set(ORDER, JSON.stringify(order));
        return order;
      }
    }));
  }

  getTotalItem(): Observable<number> {
    return fromPromise(this.storage.get(ORDER).then((val) => {
      return (val == null) ? 0 : this.countItem(JSON.parse(val));
    }));
  }

  getTotalPrice(): Observable<number> {
    return fromPromise(this.storage.get(ORDER).then((val) => {
      return (val == null) ? 0 : this.countPrice(JSON.parse(val));
    }));
  }

  addItem(product: Product): Observable<Order> {
    return fromPromise(this.storage.get(ORDER).then((val) => {
      let order = (val == null) ? new Order(uuid(), this.util.transactionNumber(), new Array<Item>()) : JSON.parse(val);
      order = this.addProduct(order, product);
      this.storage.set(ORDER, JSON.stringify(order));
      return order;
    }));
  }

  removeItem(product: Product): Observable<Order> {
    return fromPromise(this.storage.get(ORDER).then((val) => {
      let order = (val == null) ? new Order(uuid(), this.util.transactionNumber(), new Array<Item>()) : JSON.parse(val);
      order = this.removeProduct(order, product);
      this.storage.set(ORDER, JSON.stringify(order));
      return order;
    }));
  }

  countItem(order: Order): number {
    let total: number = 0;

    for (let i = 0; i < order.items.length; i++) {
      total += order.items[i].quantity;
    }

    return total;
  }

  countPrice(order: Order): number {
    let total: number = 0;

    for (let i = 0; i < order.items.length; i++) {
      total += order.items[i].quantity * order.items[i].product.price;
    }

    return total;
  }

  private addProduct(order: Order, product: Product): Order {
    let isProductExist: boolean = false;

    for (let i = 0; i < order.items.length; i++) {
      if (product.id === order.items[i].product.id) {
        order.items[i].quantity++;
        isProductExist = true;
      }
    }

    if (!isProductExist) {
      order.items.push(new Item(uuid(), product, 1));
    }

    return order;
  }

  private removeProduct(order: Order, product: Product): Order {
    let isQuantityZero: boolean = false;
    let index: number = 0;

    for (let i = 0; i < order.items.length; i++) {
      if (product.id === order.items[i].product.id) {
        order.items[i].quantity--;

        if (order.items[i].quantity === 0) {
          index = i;
          isQuantityZero = true;
        }

      }
    }

    if (isQuantityZero) {
      order.items.splice(index, 1);
    }

    return order;
  }

}
