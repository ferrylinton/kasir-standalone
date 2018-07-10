import { SQLite } from "@ionic-native/sqlite";
import { Storage } from '@ionic/storage';
import * as Constant from "../../constant/constant";
import { Pageable } from "../../models/pageable.model";
import { Order } from "../../models/order.model";
import { OrderItem } from "../../models/order-item.model";
import { Product } from "../../models/product.model";
import { Category } from "../../models/category.model";
import { User } from "../../models/user.model";
import { Role } from "../../models/role.model";
import { Authority } from "../../models/authority.model";
import { Currency } from "../../models/currency.model";

export abstract class BaseSQlite {

    dbConfig: any = {
        name: 'xhop.db',
        location: 'default'
    };

    db: any;

    LOGGED_USER: User;

    constructor(public sqlite: SQLite, public storage: Storage) {
        this.storage.get(Constant.LOGGED_USER).then((value) => {
            this.LOGGED_USER = JSON.parse(value);
        });
    }

    connect(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.db) {
                resolve(this.db);
            } else {
                this.sqlite.create(this.dbConfig).then((db) => {
                    this.db = db;
                    resolve(db);
                }).catch((error) => {
                    console.log('BaseDb -> connect :: ' + JSON.stringify(error));
                    reject(error);
                });
            }
        });
    }

    executeSql(query: string, params: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.executeSql(query, params).then((data) => {
                resolve(data);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    createParams(params: Array<any>, pageable: Pageable): Array<any> {
        let limit: number = pageable.size;
        let offset: number = (pageable.pageNumber - 1) * pageable.size;
        let orderBy: string = pageable.sort.column + (pageable.sort.isAsc) ? ' ASC' : ' DESC';

        return [...params, ...[orderBy, limit, offset]];
    }

    convertToUser(item: any): User {
        let user: User = new User(
            item['user_id'],
            item['user_username'],
            item['user_password'],
            item['user_fullname'],
            this.convertToRole(item),
            item['user_activated'],
            item['user_image'],
            item['user_created_by'],
            item['user_created_date'],
            item['user_last_modified_by'],
            item['user_last_modified_date']
        );
        return user;
    }

    convertToRole(item: any): Role {
        return new Role(
            item['role_id'],
            item['role_name'],
            item['role_description'],
            new Array<Authority>(),
            item['role_created_by'],
            item['role_created_date'],
            item['role_last_modified_by'],
            item['role_last_modified_date']
        );
    }

    convertToAuthority(item: any): Authority {
        return new Authority(
            item['authority_id'],
            item['authority_name'],
            item['authority_description']
        );
    }

    convertToOrder(item: any): Order {
        return new Order(
            item['order_id'],
            item['order_transaction_number'],
            new Array(),
            item['order_paid'],
            item['order_canceled'],
            item['order_created_by'],
            item['order_created_date'],
            item['order_last_modified_by'],
            item['order_last_modified_date']
        );
    }

    convertToItem(item: any): OrderItem {
        return new OrderItem(
            item['item_id'],
            item['item_quantity'],
            item['item_price'],
            this.convertToProduct(item)
        );
    }

    convertToProduct(item: any): Product {
        return new Product(
            item['product_id'],
            item['product_name'],
            item['product_description'],
            item['product_price'],
            item['product_image'],
            this.convertToCategory(item),
            item['product_created_by'],
            item['product_created_date'],
            item['product_last_modified_by'],
            item['product_last_modified_date']
        );
    }

    convertToCategory(item: any): Category {
        return new Category(
            item['category_id'],
            item['category_name'],
            item['category_description'],
            item['category_image'],
            item['category_created_by'],
            item['category_created_date'],
            item['category_last_modified_by'],
            item['category_last_modified_date']
        );
    }

    convertToCurrency(item: any): Currency {
        return new Currency(
            item['currency_id'],
            item['currency_name'],
            item['currency_description'],
            item['currency_created_by'],
            item['currency_created_date'],
            item['currency_last_modified_by'],
            item['currency_last_modified_date']
        );
    }
}