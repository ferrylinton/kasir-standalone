import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

import { BaseSQlite } from './base';
import * as VERSION from './version-query';
import * as AUTHORITY from './authority-query';
import * as ROLE from './role-query';
import * as ROLE_AUTHORITY from './role-authority-query';
import * as USER from './user-query';
import * as CURRENCY from './currency-query';
import * as CATEGORY from './category-query';
import * as PRODUCT from './product-query';
import * as ORDER from './order-query';
import * as ORDER_ITEM from './order-item-query';
import { DEFAULT_IMAGE } from '../../constant/default-image';
import { DEFAULT_USER } from '../../constant/user-image';
import { DB_STATUS, DB_VERSION } from '../../constant/constant';
import { OpenPGPProvider } from '../openpgp/openpgp';


@Injectable()
export class SchemaProvider extends BaseSQlite {

  private readonly createQueries = [
    VERSION.CREATE_TABLE,
    AUTHORITY.CREATE_TABLE,
    ROLE.CREATE_TABLE,
    ROLE_AUTHORITY.CREATE_TABLE,
    USER.CREATE_TABLE,
    CURRENCY.CREATE_TABLE,
    CATEGORY.CREATE_TABLE,
    PRODUCT.CREATE_TABLE,
    ORDER.CREATE_TABLE,
    ORDER_ITEM.CREATE_TABLE,
  ];

  private readonly dropQueries = [
    VERSION.DROP_TABLE,
    AUTHORITY.DROP_TABLE,
    ROLE.DROP_TABLE,
    ROLE_AUTHORITY.DROP_TABLE,
    USER.DROP_TABLE,
    CURRENCY.DROP_TABLE,
    CATEGORY.DROP_TABLE,
    PRODUCT.DROP_TABLE,
    ORDER.DROP_TABLE,
    ORDER_ITEM.DROP_TABLE,
  ];

  private upToDate: boolean;

  private previousVersion: string;

  constructor(public sqlite: SQLite, public storage: Storage, public openPGPProvider: OpenPGPProvider) {
    super(sqlite, storage);
  }

  initDB(): Observable<any> {
    return new Observable(observer => {
      this.connect()
        .then(() => this.checkStatus())
        .then(() => this.createTables())
        .then(() => this.checkVersion())
        .then(() => this.updateVersion())
        .then(() => this.initDatas().then(result => {
          observer.next(result);
          observer.complete();
        }))
        .catch((error) => {
          observer.next(error);
          observer.complete();
        })
    })
  }

  private checkStatus(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.executeSql(VERSION.FIND_LATEST, []).then((data) => {
        this.upToDate = true;
        resolve();
      }).catch((error) => {
        resolve();
      });
    })
  }

  private createTables(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.upToDate) {
        this.db.sqlBatch([...this.dropQueries, ...this.createQueries]).then((result) => {
          resolve();
        }).catch((error) => {
          reject(error);
        });
      } else {
        resolve();
      }
    });
  }

  private checkVersion(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.upToDate) {
        this.db.executeSql(VERSION.FIND_LATEST, []).then((data) => {
          this.previousVersion = data.rows.item(0)['version'];

          if (this.previousVersion == null) {
            this.previousVersion = '0.0.0';
            resolve();
          } else if (this.previousVersion == '0.0.0' && DB_VERSION == '0.0.1') {
            resolve();
          } else if (this.previousVersion == '0.0.1' && DB_VERSION == '0.0.1') {
            this.upToDate = true;
            resolve();
          }

        }).catch((error) => {
          reject(error);
        });
      } else {
        resolve();
      }
    })
  }

  private updateVersion(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.upToDate) {
        this.db.executeSql(VERSION.INSERT, [DB_VERSION]).then((data) => {
          resolve();
        }).catch((error) => {
          reject(error);
        });
      } else {
        resolve();
      }
    })
  }

  private initDatas(): Promise<string> {
    return new Promise((resolve, reject) => {

      if (!this.upToDate) {
        this.db.transaction((tx) => {

          this.openPGPProvider.encryptWithPassword('password').then(defaultPassword => {
            // Insert User for system
            tx.executeSql(USER.INSERT, ['user-0000-0000-0000-000', 'system', defaultPassword, 'system', null, true, DEFAULT_IMAGE, 'user-0000-0000-0000-000']);

            // Insert Authority
            tx.executeSql(AUTHORITY.INSERT, ['authority-0000-0000-0000-001', 'BASIC_AUTHORITY', 'Basic Authority']);
            tx.executeSql(AUTHORITY.INSERT, ['authority-0000-0000-0000-002', 'AUTHORITY_VIEW', 'View Authority Data']);
            tx.executeSql(AUTHORITY.INSERT, ['authority-0000-0000-0000-003', 'ROLE_VIEW', 'View Role Data']);
            tx.executeSql(AUTHORITY.INSERT, ['authority-0000-0000-0000-004', 'ROLE_CHANGE', 'Change Role Data']);
            tx.executeSql(AUTHORITY.INSERT, ['authority-0000-0000-0000-005', 'USER_VIEW', 'View User Data']);
            tx.executeSql(AUTHORITY.INSERT, ['authority-0000-0000-0000-006', 'USER_CHANGE', 'Change User Data']);
            tx.executeSql(AUTHORITY.INSERT, ['authority-0000-0000-0000-007', 'CURRENCY_VIEW', 'View Currency Data']);
            tx.executeSql(AUTHORITY.INSERT, ['authority-0000-0000-0000-008', 'CURRENCY_CHANGE', 'Change Currency Data']);
            tx.executeSql(AUTHORITY.INSERT, ['authority-0000-0000-0000-009', 'CATEGORY_VIEW', 'View Category Data']);
            tx.executeSql(AUTHORITY.INSERT, ['authority-0000-0000-0000-010', 'CATEGORY_CHANGE', 'Change Category Data']);
            tx.executeSql(AUTHORITY.INSERT, ['authority-0000-0000-0000-011', 'PRODUCT_VIEW', 'View Product Data']);
            tx.executeSql(AUTHORITY.INSERT, ['authority-0000-0000-0000-012', 'PRODUCT_CHANGE', 'Change Product Data']);
            tx.executeSql(AUTHORITY.INSERT, ['authority-0000-0000-0000-013', 'ORDER_VIEW', 'View Order Data']);
            tx.executeSql(AUTHORITY.INSERT, ['authority-0000-0000-0000-014', 'ORDER_CHANGE', 'Change Order Data']);
            tx.executeSql(AUTHORITY.INSERT, ['authority-0000-0000-0000-015', 'SETTING_VIEW', 'View Setting Data']);
            tx.executeSql(AUTHORITY.INSERT, ['authority-0000-0000-0000-016', 'SETTING_CHANGE', 'Change Setting Data']);

            // Insert Role
            tx.executeSql(ROLE.INSERT, ['role-0000-0000-0000-001', 'ADMIN', 'Role as Admin', 'user-0000-0000-0000-000']);
            tx.executeSql(ROLE.INSERT, ['role-0000-0000-0000-002', 'MANAGER', 'Role as Manager', 'user-0000-0000-0000-000']);
            tx.executeSql(ROLE.INSERT, ['role-0000-0000-0000-003', 'EMPLOYEE', 'Role as Employee', 'user-0000-0000-0000-000']);

            // Insert Role - Authority
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-001']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-002']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-003']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-004']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-005']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-006']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-009']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-010']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-011']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-012']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-015']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-016']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-007']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-008']);

            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-001']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-002']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-003']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-004']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-005']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-006']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-009']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-010']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-011']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-012']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-013']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-014']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-015']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-016']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-007']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-008']);

            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-003', 'authority-0000-0000-0000-001']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-003', 'authority-0000-0000-0000-002']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-003', 'authority-0000-0000-0000-003']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-003', 'authority-0000-0000-0000-005']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-003', 'authority-0000-0000-0000-009']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-003', 'authority-0000-0000-0000-011']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-003', 'authority-0000-0000-0000-013']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-003', 'authority-0000-0000-0000-014']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-003', 'authority-0000-0000-0000-015']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-003', 'authority-0000-0000-0000-016']);
            tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-003', 'authority-0000-0000-0000-007']);

            // Insert User
            tx.executeSql(USER.INSERT, ['user-0000-0000-0000-001', 'admin', defaultPassword, 'Admin', 'role-0000-0000-0000-001', true, DEFAULT_USER, 'user-0000-0000-0000-000']);
            tx.executeSql(USER.INSERT, ['user-0000-0000-0000-002', 'manager', defaultPassword, 'Manager', 'role-0000-0000-0000-002', true, DEFAULT_USER, 'user-0000-0000-0000-000']);
            tx.executeSql(USER.INSERT, ['user-0000-0000-0000-003', 'employee', defaultPassword, 'Employee', 'role-0000-0000-0000-003', true, DEFAULT_USER, 'user-0000-0000-0000-000']);


            tx.executeSql(CURRENCY.INSERT, ['currency-0000-0000-0000-001', 'IDR', 'Indonesian Rupiah', 'user-0000-0000-0000-000']);
            tx.executeSql(CURRENCY.INSERT, ['currency-0000-0000-0000-002', 'USD', 'US Dollar', 'user-0000-0000-0000-000']);


            tx.executeSql(CATEGORY.INSERT, ['category-0000-0000-0000-001', 'Category 001', 'Category description 001', DEFAULT_IMAGE, 'user-0000-0000-0000-000']);
            tx.executeSql(CATEGORY.INSERT, ['category-0000-0000-0000-002', 'Category 002', 'Category description 002', DEFAULT_IMAGE, 'user-0000-0000-0000-000']);
            tx.executeSql(CATEGORY.INSERT, ['category-0000-0000-0000-003', 'Category 003', 'Category description 003', DEFAULT_IMAGE, 'user-0000-0000-0000-000']);
            tx.executeSql(CATEGORY.INSERT, ['category-0000-0000-0000-004', 'Category 004', 'Category description 004', DEFAULT_IMAGE, 'user-0000-0000-0000-000']);
            tx.executeSql(CATEGORY.INSERT, ['category-0000-0000-0000-005', 'Category 005', 'Category description 005', DEFAULT_IMAGE, 'user-0000-0000-0000-000']);
            tx.executeSql(CATEGORY.INSERT, ['category-0000-0000-0000-006', 'Category 006', 'Category description 006', DEFAULT_IMAGE, 'user-0000-0000-0000-000']);
            tx.executeSql(CATEGORY.INSERT, ['category-0000-0000-0000-007', 'Category 007', 'Category description 007', DEFAULT_IMAGE, 'user-0000-0000-0000-000']);
            tx.executeSql(CATEGORY.INSERT, ['category-0000-0000-0000-008', 'Category 008', 'Category description 008', DEFAULT_IMAGE, 'user-0000-0000-0000-000']);
            tx.executeSql(CATEGORY.INSERT, ['category-0000-0000-0000-009', 'Category 009', 'Category description 009', DEFAULT_IMAGE, 'user-0000-0000-0000-000']);
            tx.executeSql(CATEGORY.INSERT, ['category-0000-0000-0000-010', 'Category 010', 'Category description 010', DEFAULT_IMAGE, 'user-0000-0000-0000-000']);
            tx.executeSql(CATEGORY.INSERT, ['category-0000-0000-0000-011', 'Category 011', 'Category description 011', DEFAULT_IMAGE, 'user-0000-0000-0000-000']);
            tx.executeSql(CATEGORY.INSERT, ['category-0000-0000-0000-012', 'Category 012', 'Category description 012', DEFAULT_IMAGE, 'user-0000-0000-0000-000']);
            tx.executeSql(CATEGORY.INSERT, ['category-0000-0000-0000-013', 'Category 013', 'Category description 013', DEFAULT_IMAGE, 'user-0000-0000-0000-000']);
            tx.executeSql(CATEGORY.INSERT, ['category-0000-0000-0000-014', 'Category 014', 'Category description 014', DEFAULT_IMAGE, 'user-0000-0000-0000-000']);
            tx.executeSql(CATEGORY.INSERT, ['category-0000-0000-0000-015', 'Category 015', 'Category description 015', DEFAULT_IMAGE, 'user-0000-0000-0000-000']);


            tx.executeSql(PRODUCT.INSERT, ['product-0000-0000-0000-101', 'Product 101', 'Product description 101', 110000, DEFAULT_IMAGE, 'category-0000-0000-0000-001', 'user-0000-0000-0000-000']);
            tx.executeSql(PRODUCT.INSERT, ['product-0000-0000-0000-102', 'Product 102', 'Product description 102', 120000, DEFAULT_IMAGE, 'category-0000-0000-0000-001', 'user-0000-0000-0000-000']);
            tx.executeSql(PRODUCT.INSERT, ['product-0000-0000-0000-103', 'Product 103', 'Product description 103', 130000, DEFAULT_IMAGE, 'category-0000-0000-0000-001', 'user-0000-0000-0000-000']);
            tx.executeSql(PRODUCT.INSERT, ['product-0000-0000-0000-104', 'Product 104', 'Product description 104', 140000, DEFAULT_IMAGE, 'category-0000-0000-0000-001', 'user-0000-0000-0000-000']);
            tx.executeSql(PRODUCT.INSERT, ['product-0000-0000-0000-105', 'Product 105', 'Product description 105', 150000, DEFAULT_IMAGE, 'category-0000-0000-0000-001', 'user-0000-0000-0000-000']);
            tx.executeSql(PRODUCT.INSERT, ['product-0000-0000-0000-106', 'Product 106', 'Product description 106', 160000, DEFAULT_IMAGE, 'category-0000-0000-0000-001', 'user-0000-0000-0000-000']);
            tx.executeSql(PRODUCT.INSERT, ['product-0000-0000-0000-107', 'Product 107', 'Product description 107', 170000, DEFAULT_IMAGE, 'category-0000-0000-0000-001', 'user-0000-0000-0000-000']);
            tx.executeSql(PRODUCT.INSERT, ['product-0000-0000-0000-108', 'Product 108', 'Product description 108', 180000, DEFAULT_IMAGE, 'category-0000-0000-0000-001', 'user-0000-0000-0000-000']);
            tx.executeSql(PRODUCT.INSERT, ['product-0000-0000-0000-109', 'Product 109', 'Product description 109', 190000, DEFAULT_IMAGE, 'category-0000-0000-0000-001', 'user-0000-0000-0000-000']);
            tx.executeSql(PRODUCT.INSERT, ['product-0000-0000-0000-110', 'Product 110', 'Product description 110', 200000, DEFAULT_IMAGE, 'category-0000-0000-0000-001', 'user-0000-0000-0000-000']);
            tx.executeSql(PRODUCT.INSERT, ['product-0000-0000-0000-111', 'Product 111', 'Product description 111', 210000, DEFAULT_IMAGE, 'category-0000-0000-0000-001', 'user-0000-0000-0000-000']);
            tx.executeSql(PRODUCT.INSERT, ['product-0000-0000-0000-112', 'Product 112', 'Product description 112', 220000, DEFAULT_IMAGE, 'category-0000-0000-0000-001', 'user-0000-0000-0000-000']);

            tx.executeSql(PRODUCT.INSERT, ['product-0000-0000-0000-201', 'Product 201', 'Product description 201', 110000, DEFAULT_IMAGE, 'category-0000-0000-0000-002', 'user-0000-0000-0000-000']);
            tx.executeSql(PRODUCT.INSERT, ['product-0000-0000-0000-202', 'Product 202', 'Product description 202', 120000, DEFAULT_IMAGE, 'category-0000-0000-0000-002', 'user-0000-0000-0000-000']);
            tx.executeSql(PRODUCT.INSERT, ['product-0000-0000-0000-203', 'Product 203', 'Product description 203', 130000, DEFAULT_IMAGE, 'category-0000-0000-0000-002', 'user-0000-0000-0000-000']);
            tx.executeSql(PRODUCT.INSERT, ['product-0000-0000-0000-204', 'Product 204', 'Product description 204', 140000, DEFAULT_IMAGE, 'category-0000-0000-0000-002', 'user-0000-0000-0000-000']);
            tx.executeSql(PRODUCT.INSERT, ['product-0000-0000-0000-205', 'Product 205', 'Product description 205', 150000, DEFAULT_IMAGE, 'category-0000-0000-0000-002', 'user-0000-0000-0000-000']);
            tx.executeSql(PRODUCT.INSERT, ['product-0000-0000-0000-206', 'Product 206', 'Product description 206', 160000, DEFAULT_IMAGE, 'category-0000-0000-0000-002', 'user-0000-0000-0000-000']);
            tx.executeSql(PRODUCT.INSERT, ['product-0000-0000-0000-207', 'Product 207', 'Product description 207', 170000, DEFAULT_IMAGE, 'category-0000-0000-0000-002', 'user-0000-0000-0000-000']);
            tx.executeSql(PRODUCT.INSERT, ['product-0000-0000-0000-208', 'Product 208', 'Product description 208', 180000, DEFAULT_IMAGE, 'category-0000-0000-0000-002', 'user-0000-0000-0000-000']);
            tx.executeSql(PRODUCT.INSERT, ['product-0000-0000-0000-209', 'Product 209', 'Product description 209', 190000, DEFAULT_IMAGE, 'category-0000-0000-0000-002', 'user-0000-0000-0000-000']);
            tx.executeSql(PRODUCT.INSERT, ['product-0000-0000-0000-210', 'Product 210', 'Product description 210', 200000, DEFAULT_IMAGE, 'category-0000-0000-0000-002', 'user-0000-0000-0000-000']);
            tx.executeSql(PRODUCT.INSERT, ['product-0000-0000-0000-211', 'Product 211', 'Product description 211', 210000, DEFAULT_IMAGE, 'category-0000-0000-0000-002', 'user-0000-0000-0000-000']);
            tx.executeSql(PRODUCT.INSERT, ['product-0000-0000-0000-212', 'Product 212', 'Product description 212', 220000, DEFAULT_IMAGE, 'category-0000-0000-0000-002', 'user-0000-0000-0000-000']);


            tx.executeSql(ORDER.INSERT, ['order-0000-0000-0000-100', '0000-0000-100', true, false, 'note test 1', 'user-0000-0000-0000-000']);
            tx.executeSql(ORDER_ITEM.INSERT, ['item-0000-0000-0000-101', 'order-0000-0000-0000-100', 'product-0000-0000-0000-101', 2, 1000.55, 'note test aa']);
            tx.executeSql(ORDER_ITEM.INSERT, ['item-0000-0000-0000-102', 'order-0000-0000-0000-100', 'product-0000-0000-0000-102', 3, 1000.55, 'note test bb']);
            tx.executeSql(ORDER_ITEM.INSERT, ['item-0000-0000-0000-103', 'order-0000-0000-0000-100', 'product-0000-0000-0000-103', 4, 1000.55, 'note test cc']);

            tx.executeSql(ORDER.INSERT_1, ['order-0000-0000-0000-200', '0000-0000-200', true, true, 'note test 1', 'user-0000-0000-0000-000']);
            tx.executeSql(ORDER_ITEM.INSERT, ['item-0000-0000-0000-201', 'order-0000-0000-0000-200', 'product-0000-0000-0000-104', 3, 1000.55, 'note test dd']);
            tx.executeSql(ORDER_ITEM.INSERT, ['item-0000-0000-0000-202', 'order-0000-0000-0000-200', 'product-0000-0000-0000-105', 2, 1000.55, 'note test ee']);

            tx.executeSql(ORDER.INSERT_2, ['order-0000-0000-0000-300', '0000-0000-300', false, false, 'note test 1', 'user-0000-0000-0000-000']);
            tx.executeSql(ORDER_ITEM.INSERT, ['item-0000-0000-0000-301', 'order-0000-0000-0000-300', 'product-0000-0000-0000-201', 4, 1000.55, 'note test ff']);
            tx.executeSql(ORDER_ITEM.INSERT, ['item-0000-0000-0000-302', 'order-0000-0000-0000-300', 'product-0000-0000-0000-202', 2, 1000.55, 'note test gg']);
            tx.executeSql(ORDER_ITEM.INSERT, ['item-0000-0000-0000-303', 'order-0000-0000-0000-300', 'product-0000-0000-0000-203', 3, 1000.55, 'note test hh']);

            this.storage.set(DB_STATUS, JSON.stringify({ version: DB_VERSION, updatedDate: new Date(), previousVersion: this.previousVersion }));
          });


        }).then((result) => {
          resolve('Insert sample data is success');
        }).catch((error) => {
          reject(error);
        });
      } else {
        resolve('DB is already up to date');
      }
    });
  }

}
