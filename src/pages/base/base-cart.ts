import { Storage } from '@ionic/storage';
import { v4 as uuid } from 'uuid';

import { LOGGED_USER, ORDER } from "../../constant/constant";
import { User } from "../../models/user.model";
import { Order } from "../../models/order.model";
import { Item } from "../../models/item.model";
import { Product } from "../../models/product.model";


export abstract class BaseCart {

    loggedUser: User;

    order: Order;

    totalItems: number;

    totalPrice: number;

    constructor(
        public storage: Storage
    ) {

        storage.get(LOGGED_USER).then((val) => {
            this.loggedUser = JSON.parse(val);
        });
    }

    getOrder(): Promise<Order> {
        return new Promise((resolve, reject) => {
            this.storage.get(ORDER).then((order) => {
                if (order == null) {
                    let newOrder = new Order(uuid(), new Array<Item>());
                    this.storage.set(ORDER, JSON.stringify(newOrder));
                    resolve(newOrder);
                } else {
                    resolve(JSON.parse(order));
                }
            })
        });
    }

    getTotalItems(): void {
        this.storage.get(ORDER).then((val) => {
            this.totalItems = (val == null) ? 0 : this.countItems(JSON.parse(val));
        })
    }

    getTotalPrice(): void {
        this.storage.get(ORDER).then((val) => {
            this.totalPrice = (val == null) ? 0 : this.countPrice(JSON.parse(val));
        })
    }

    addItem(product: Product): void {
        this.storage.get(ORDER).then((val) => {
            let order = (val == null) ? new Order(uuid(), new Array<Item>()) : JSON.parse(val);
            order = this.addProduct(order, product);
            this.storage.set(ORDER, JSON.stringify(order));
            this.totalItems = this.countItems(order);
            this.totalPrice = this.countPrice(order);
            this.order = order;
        })
    }

    removeItem(product: Product): void {
        this.storage.get(ORDER).then((val) => {
            let order = (val == null) ? new Order(uuid(), new Array<Item>()) : JSON.parse(val);
            order = this.removeProduct(order, product);
            this.storage.set(ORDER, JSON.stringify(order));
            this.totalItems = this.countItems(order);
            this.totalPrice = this.countPrice(order);
            this.order = order;
        })
    }

    private countItems(order: Order): number {
        let total: number = 0;

        for (let i = 0; i < order.items.length; i++) {
            total += order.items[i].quantity;
        }

        return total;
    }

    private countPrice(order: Order): number {
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