import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite';
import { Observable } from 'rxjs/Observable';

import { BaseSQlite } from './base';
import * as AUTHORITY from '../../constant/query-authority';
import * as ROLE from '../../constant/query-role';
import * as ROLE_AUTHORITY from '../../constant/query-role-authority';
import * as USER from '../../constant/query-user';
import * as CURRENCY from '../../constant/query-currency';
import * as CATEGORY from '../../constant/query-category';
import * as PRODUCT from '../../constant/query-product';
import * as ORDER from '../../constant/query-order';
import * as ORDER_ITEM from '../../constant/query-order-item';
import { DEFAULT_IMAGE } from '../../constant/constant';
import { DEFAULT_USER } from '../../constant/user-image';


@Injectable()
export class SchemaProvider extends BaseSQlite {

  private readonly createQueries = [
    AUTHORITY.DROP_TABLE,
    ROLE.DROP_TABLE,
    ROLE_AUTHORITY.DROP_TABLE,
    USER.DROP_TABLE,
    CURRENCY.DROP_TABLE,
    CATEGORY.DROP_TABLE,
    PRODUCT.DROP_TABLE,
    ORDER.DROP_TABLE,
    ORDER_ITEM.DROP_TABLE,

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

  constructor(public sqlite: SQLite) {
    super(sqlite);
  }

  initDB(): Observable<any> {
    return new Observable(observer => {
      this.connect()
        .then(db => this.initTables(db))
        .then(db => this.initDatas(db).then(result => {
          observer.next(result);
          observer.complete();
        }))
        .catch((error) => {
          observer.next(error);
          observer.complete();
        })
    })


  }

  private initTables(db: any): Promise<any> {
    return new Promise((resolve, reject) => {
      db.sqlBatch(this.createQueries).then((result) => {
        resolve(db);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  private initDatas(db: any): Promise<any> {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
       
        // Insert User for system
        tx.executeSql(USER.INSERT, ['user-0000-0000-0000-000', 'system', 'password', 'system', null, true, DEFAULT_IMAGE]);

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
        tx.executeSql(AUTHORITY.INSERT, ['authority-0000-0000-0000-017', 'DATABASE_VIEW', 'View DB Data']);
        tx.executeSql(AUTHORITY.INSERT, ['authority-0000-0000-0000-018', 'DATABASE_CHANGE', 'Change DB Data']);
        
        // Insert Role
        tx.executeSql(ROLE.INSERT, ['role-0000-0000-0000-001', 'ADMIN', 'Role as Admin']);
        tx.executeSql(ROLE.INSERT, ['role-0000-0000-0000-002', 'MANAGER', 'Role as Manager']);
        tx.executeSql(ROLE.INSERT, ['role-0000-0000-0000-003', 'EMPLOYEE', 'Role as Employee']);

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
        tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-017']);
        tx.executeSql(ROLE_AUTHORITY.INSERT, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-018']);
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
        tx.executeSql(USER.INSERT, ['user-0000-0000-0000-001', 'admin', 'password', 'Admin', 'role-0000-0000-0000-001', true, DEFAULT_USER]);
        tx.executeSql(USER.INSERT, ['user-0000-0000-0000-002', 'manager', 'password', 'Manager', 'role-0000-0000-0000-002', true, DEFAULT_USER]);
        tx.executeSql(USER.INSERT, ['user-0000-0000-0000-003', 'employee', 'password', 'Employee', 'role-0000-0000-0000-003', true, DEFAULT_USER]);

        
        tx.executeSql(CURRENCY.INSERT, ['currency-0000-0000-0000-001', 'IDR', 'Indonesian Rupiah']);
        tx.executeSql(CURRENCY.INSERT, ['currency-0000-0000-0000-002', 'USD', 'US Dollar']);

        
        tx.executeSql(CATEGORY.INSERT, ['category-0000-0000-0000-001', 'Category 001', 'Category description 001', DEFAULT_IMAGE]);
        // tx.executeSql(CATEGORY.INSERT, ['category-0000-0000-0000-002', 'Category 002', 'Category description 002', DEFAULT_IMAGE]);
        // tx.executeSql(CATEGORY.INSERT, ['category-0000-0000-0000-003', 'Category 003', 'Category description 003', DEFAULT_IMAGE]);
        // tx.executeSql(CATEGORY.INSERT, ['category-0000-0000-0000-004', 'Category 004', 'Category description 004', DEFAULT_IMAGE]);
        // tx.executeSql(CATEGORY.INSERT, ['category-0000-0000-0000-005', 'Category 005', 'Category description 005', DEFAULT_IMAGE]);
        // tx.executeSql(CATEGORY.INSERT, ['category-0000-0000-0000-006', 'Category 006', 'Category description 006', DEFAULT_IMAGE]);
        // tx.executeSql(CATEGORY.INSERT, ['category-0000-0000-0000-007', 'Category 007', 'Category description 007', DEFAULT_IMAGE]);
        // tx.executeSql(CATEGORY.INSERT, ['category-0000-0000-0000-008', 'Category 008', 'Category description 008', DEFAULT_IMAGE]);
        // tx.executeSql(CATEGORY.INSERT, ['category-0000-0000-0000-009', 'Category 009', 'Category description 009', DEFAULT_IMAGE]);
        // tx.executeSql(CATEGORY.INSERT, ['category-0000-0000-0000-010', 'Category 010', 'Category description 010', DEFAULT_IMAGE]);
        // tx.executeSql(CATEGORY.INSERT, ['category-0000-0000-0000-011', 'Category 011', 'Category description 011', DEFAULT_IMAGE]);
        // tx.executeSql(CATEGORY.INSERT, ['category-0000-0000-0000-012', 'Category 012', 'Category description 012', DEFAULT_IMAGE]);
        // tx.executeSql(CATEGORY.INSERT, ['category-0000-0000-0000-013', 'Category 013', 'Category description 013', DEFAULT_IMAGE]);
        // tx.executeSql(CATEGORY.INSERT, ['category-0000-0000-0000-014', 'Category 014', 'Category description 014', DEFAULT_IMAGE]);
        // tx.executeSql(CATEGORY.INSERT, ['category-0000-0000-0000-015', 'Category 015', 'Category description 015', DEFAULT_IMAGE]);
        
        
        tx.executeSql(PRODUCT.INSERT, ['product-0000-0000-0000-001', 'Product 001', 'Product description 015', 150000, DEFAULT_IMAGE, 'category-0000-0000-0000-001']);

      }).then((result) => {
        resolve('Insert sample data is success');
      }).catch((error) => {
        reject(error);
      });
    });
  }

}
