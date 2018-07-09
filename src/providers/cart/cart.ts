import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { v4 as uuid } from 'uuid';

import { CART } from "../../constant/constant";
import { OrderProvider } from '../order/order';
import { Order } from "../../models/order.model";
import { OrderItem } from "../../models/order-item.model";
import { Product } from "../../models/product.model";
import { Cart } from '../../models/cart.model';


@Injectable()
export class CartProvider {

  constructor(
    public storage: Storage,
    public orderProvider: OrderProvider
  ) {
  }

  getCart(): Observable<Cart> {
    return fromPromise(this.storage.get(CART).then((json) => {
      if (json) {
        let cart: Cart = JSON.parse(json);
        cart.isModified = cart.order.createdBy ? true : false;
        return cart;
      } else {
        return this.createNewCart();
      }
    }));
  }

  createCartFromOrder(order: Order): Cart {
    let cart: Cart = new Cart(order, this.countItem(order), this.countPrice(order));
    cart.isModified = cart.order.createdBy ? true : false;
    return cart;
  }

  createNewCart(): Cart {
    return new Cart(this.createOrder());
  }

  setCartFromOrder(order: Order): Observable<Cart> {
    return this.setCart(this.createCartFromOrder(order));
  }

  setCart(cart: Cart): Observable<Cart> {
    return fromPromise(this.storage.set(CART, JSON.stringify(cart)).then(json => {
      cart = JSON.parse(json);
      cart.isModified = cart.order.createdBy ? true : false;
      return cart;
    }));
  }

  createOrder(): Order {
    return new Order(uuid(), this.transactionNumber(), new Array<OrderItem>(), false);
  }

  addItem(cart: Cart, product: Product): Observable<Cart> {
    cart = this.addProduct(cart, product);
    cart.totalItem = this.countItem(cart.order);
    cart.totalPrice = this.countPrice(cart.order);
    return fromPromise(this.storage.set(CART, JSON.stringify(cart)).then(() => {
      return cart;
    }));
  }

  removeItem(cart: Cart, product: Product): Observable<Cart> {
    cart = this.removeProduct(cart, product);
    cart.totalItem = this.countItem(cart.order);
    cart.totalPrice = this.countPrice(cart.order);
    return fromPromise(this.storage.set(CART, JSON.stringify(cart)).then(() => {
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
      cart.order.items.push(new OrderItem(uuid(), 1, 0, null));
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

  transactionNumber(): string {
    return new Date().valueOf() + '-' + Math.floor((Math.random() * 10000) + 10000);
  }
}
