import { Storage } from '@ionic/storage';
import { v4 as uuid } from 'uuid';

import { LOGGED_USER } from "../../constant/constant";
import { User } from "../../models/user.model";
import { Order } from "../../models/order.model";
import { Item } from "../../models/item.model";
import { Product } from "../../models/product.model";


export abstract class BaseCart {

    loggedUser: User;

    order: Order;

    totalItems: number;

    constructor(
        public storage: Storage
    ) {

        storage.get(LOGGED_USER).then((val) => {
            this.loggedUser = JSON.parse(val);
        });
    }

    getOrder(): Order {
        if (this.order == null) {
            this.order = new Order(uuid(), new Array<Item>());
        }

        return this.order;
    }

    getTotalItems(): number {
        let total: number = 0;

        for (let i = 0; i < this.getOrder().items.length; i++) {
            total += this.getOrder().items[i].quantity;
        }

        return total;
    }

    addItem(product: Product) {
        let isProductExit = false;

        for (let i = 0; i < this.getOrder().items.length; i++) {
            if (product.id === this.getOrder().items[i].product.id) {
                this.getOrder().items[i].quantity++;
                isProductExit = true;
            }
        }

        if (!isProductExit) {
            delete product.createdBy;
            delete product.createdDate;
            delete product.lastModifiedBy;
            delete product.lastModifiedDate;

            this.getOrder().items.push(new Item(uuid(), product, 1))
        }

        this.totalItems = this.getTotalItems();
    }

    removeItem(product: Product) {
        let isQuantityZero: boolean = false;
        let index: number = 0;

        for (let i = 0; i < this.getOrder().items.length; i++) {
            if (product.id === this.getOrder().items[i].product.id) {
                this.getOrder().items[i].quantity--;

                if (this.getOrder().items[i].quantity === 0) {
                    index = i;
                    isQuantityZero = true;
                }

            }
        }

        if (isQuantityZero) {
            this.getOrder().items.splice(index, 1);
        }

        this.totalItems = this.getTotalItems();
    }
}