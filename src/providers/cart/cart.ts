import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { v4 as uuid } from 'uuid';

import { ORDER } from "../../constant/constant";
import { UtilProvider } from '../../providers/util/util';
import { OrderProvider } from '../order/order';
import { Order } from "../../models/order.model";
import { Item } from "../../models/item.model";
import { Product } from "../../models/product.model";
import { Cart } from '../../models/cart.model';


@Injectable()
export class CartProvider {

  constructor(
    public storage: Storage,
    public utilProvider: UtilProvider,
    public orderProvider: OrderProvider
  ) {
  }

  getCart(order?: Order): Observable<Cart> {
    if (order) {
      let cart = this.createCart(order);
      cart.isModified = true;
      return of(cart);
    } else {
      return fromPromise(this.storage.get(ORDER).then((order) => {
        if (order) {
          return this.createCart(JSON.parse(order));
        } else {
          let cart = this.createCart();
          cart.isModified = false;
          return cart;
        }
      }));
    }
  }

  deleteCart() {
    let cart = this.createCart();
    cart.isModified = false;
    this.storage.set(ORDER, JSON.stringify(cart.order));
    return cart;
  }

  private createCart(order?: Order): Cart {
    let cart;
    if (order) {
      cart = new Cart(order, this.countItem(order), this.countPrice(order));
    } else {
      cart = new Cart(this.createOrder(), 0, 0);
    }

    this.storage.set(ORDER, JSON.stringify(cart.order));
    return cart;
  }

  private createOrder(): Order {
    return new Order(uuid(), this.utilProvider.transactionNumber(), new Array<Item>(), false);
  }


  setCart(order: Order): Observable<Cart> {
    if (this.countItem(order) == 0) {
      return fromPromise(this.storage.set(ORDER, order).then(order => {
        return this.createCart(JSON.parse(order));
      }));
    } else {
      return of(this.createCart(order));
    }
  }





  addItem(product: Product): Observable<Order> {
    return fromPromise(this.storage.get(ORDER).then((val) => {
      let order = (val == null) ? new Order(uuid(), this.utilProvider.transactionNumber(), new Array<Item>()) : JSON.parse(val);
      order = this.addProduct(order, product);
      this.storage.set(ORDER, JSON.stringify(order));
      return order;
    }));
  }

  removeItem(product: Product): Observable<Order> {
    return fromPromise(this.storage.get(ORDER).then((val) => {
      let order = (val == null) ? new Order(uuid(), this.utilProvider.transactionNumber(), new Array<Item>()) : JSON.parse(val);
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
