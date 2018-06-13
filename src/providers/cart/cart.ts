import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { v4 as uuid } from 'uuid';

import { CART } from "../../constant/constant";
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

  getCart(): Observable<Cart>{
    console.log('getCart.............');
    return fromPromise(this.storage.get(CART).then((cart) => {
      if (cart) {
        return JSON.parse(cart);
      } else {
        return this.createNewCart();
      }
    }));
  }

  createCartFromOrder(order: Order): Cart{
    return new Cart(order, this.countItem(order), this.countPrice(order));
  }

  createNewCart(): Cart{
    return new Cart(this.createOrder());
  }

  setCart(arg: Order | Cart): Observable<Cart> {
    console.log('setCart.............');
    let cart: Cart = arg instanceof Order ? this.createCartFromOrder(arg) : arg; 

    return fromPromise(this.storage.set(CART, JSON.stringify(cart)).then(cart => {
      return JSON.parse(cart);
    }));
  }

  createOrder(): Order {
    return new Order(uuid(), this.utilProvider.transactionNumber(), new Array<Item>(), false);
  }

  addItem(product: Product): Observable<Cart> {
    return fromPromise(this.storage.get(CART).then((val) => {
      let cart = this.addProduct((val == null) ? this.createNewCart() : JSON.parse(val), product);
      cart.totalItem = this.countItem(cart.order);
      cart.totalPrice = this.countPrice(cart.order);
      this.storage.set(CART, JSON.stringify(cart));
      return cart;
    }));
  }

  removeItem(product: Product): Observable<Cart> {
    return fromPromise(this.storage.get(CART).then((val) => {
      let cart = this.removeProduct((val == null) ? this.createNewCart() : JSON.parse(val), product);
      cart.totalItem = this.countItem(cart.order);
      cart.totalPrice = this.countPrice(cart.order);
      this.storage.set(CART, JSON.stringify(cart));
      return cart;
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

  private addProduct(cart: Cart, product: Product): Cart {
    let isProductExist: boolean = false;

    for (let i = 0; i < cart.order.items.length; i++) {
      if (product.id === cart.order.items[i].product.id) {
        cart.order.items[i].quantity++;
        isProductExist = true;
      }
    }

    if (!isProductExist) {
      cart.order.items.push(new Item(uuid(), product, 1));
    }

    return cart;
  }

  private removeProduct(cart: Cart, product: Product): Cart {
    let isQuantityZero: boolean = false;
    let index: number = 0;

    for (let i = 0; i < cart.order.items.length; i++) {
      if (product.id === cart.order.items[i].product.id) {
        cart.order.items[i].quantity--;

        if (cart.order.items[i].quantity === 0) {
          index = i;
          isQuantityZero = true;
        }

      }
    }

    if (isQuantityZero) {
      cart.order.items.splice(index, 1);
    }

    return cart;
  }

}
