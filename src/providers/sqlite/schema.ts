import { Injectable } from '@angular/core';
import { BaseDb } from '../db/base-db';
import { SQLite } from '@ionic-native/sqlite';
import { Observable } from 'rxjs/Observable';
import { DEFAULT_IMAGE } from '../../constant/constant';


@Injectable()
export class SchemaProvider extends BaseDb {

  private readonly DROP_AUTHORITY = 'DROP TABLE IF EXISTS mst_authority';
  private readonly CREATE_AUTHORITY = `CREATE TABLE IF NOT EXISTS mst_authority(
                                        id VARCHAR(40) PRIMARY KEY,
                                        name VARCHAR(50) NOT NULL UNIQUE,
                                        description VARCHAR(250)
                                      )`;

  private readonly DROP_ROLE = 'DROP TABLE IF EXISTS mst_role';
  private readonly CREATE_ROLE = `CREATE TABLE IF NOT EXISTS mst_role (
                                        id VARCHAR(40) PRIMARY KEY,
                                        name VARCHAR(50) NOT NULL UNIQUE,
                                        description VARCHAR(250),
                                        created_by VARCHAR(30),
                                        created_date DATE,
                                        last_modified_by VARCHAR(30),
                                        last_modified_date DATE
                                      )`;

  private readonly DROP_ROLE_AUTHORITY = 'DROP TABLE IF EXISTS mst_role_authority';
  private readonly CREATE_ROLE_AUTHORITY = `CREATE TABLE IF NOT EXISTS mst_role_authority (
                                        role_id VARCHAR(40) NOT NULL REFERENCES mst_role(id),
                                        authority_id VARCHAR(40) NOT NULL REFERENCES mst_authority(id)
                                      )`;

  private readonly DROP_USER = 'DROP TABLE IF EXISTS mst_user';
  private readonly CREATE_USER = `CREATE TABLE IF NOT EXISTS mst_user (
                                      id VARCHAR(40) PRIMARY KEY,
                                      username VARCHAR(30) NOT NULL UNIQUE, 
                                      password VARCHAR(50) NOT NULL, 
                                      fullname VARCHAR(150) NOT NULL, 
                                      role_id VARCHAR(40) REFERENCES mst_role(id),
                                      activated BOOLEAN NOT NULL DEFAULT true,
                                      image BLOB,
                                      created_by VARCHAR(30),
                                      created_date DATE,
                                      last_modified_by VARCHAR(30),
                                      last_modified_date DATE
                                    )`;

  private readonly DROP_CURRENCY = 'DROP TABLE IF EXISTS mst_currency';
  private readonly CREATE_CURRENCY = `CREATE TABLE IF NOT EXISTS mst_currency (
                                        id VARCHAR(40) PRIMARY KEY,
                                        name VARCHAR(50) NOT NULL UNIQUE,
                                        description VARCHAR(250),
                                        created_by VARCHAR(30),
                                        created_date DATE,
                                        last_modified_by VARCHAR(30),
                                        last_modified_date DATE
                                      )`;

  private readonly DROP_CATEGORY = 'DROP TABLE IF EXISTS mst_category';
  private readonly CREATE_CATEGORY = `CREATE TABLE IF NOT EXISTS mst_category (
                                        id VARCHAR(40) PRIMARY KEY,
                                        name VARCHAR(50) NOT NULL UNIQUE,
                                        description VARCHAR(250) NOT NULL, 
                                        image BLOB,
                                        created_by VARCHAR(30),
                                        created_date DATE,
                                        last_modified_by VARCHAR(30),
                                        last_modified_date DATE
                                      )`;

  private readonly DROP_PRODUCT = 'DROP TABLE IF EXISTS mst_product';
  private readonly CREATE_PRODUCT = `CREATE TABLE IF NOT EXISTS mst_product (
                                      id VARCHAR(40) PRIMARY KEY,
                                      name VARCHAR(50) NOT NULL UNIQUE,
                                      description VARCHAR(250) NOT NULL, 
                                      price DECIMAL NOT NULL, 
                                      image BLOB, 
                                      category_id VARCHAR(40) NOT NULL REFERENCES mst_category(id),
                                      created_by VARCHAR(30),
                                      created_date DATE,
                                      last_modified_by VARCHAR(30),
                                      last_modified_date DATE
                                    )`;

  private readonly DROP_ORDER = 'DROP TABLE IF EXISTS trx_order';
  private readonly CREATE_ORDER = `CREATE TABLE IF NOT EXISTS trx_order(
                                    id VARCHAR(40) PRIMARY KEY, 
                                    transaction_number VARCHAR(40) NOT NULL UNIQUE, 
                                    paid BOOLEAN NOT NULL DEFAULT false,
                                    canceled BOOLEAN NOT NULL DEFAULT false,
                                    created_by VARCHAR(30),
                                    created_date DATE,
                                    last_modified_by VARCHAR(30),
                                    last_modified_date DATE
                                  )`;

  private readonly DROP_ITEM = 'DROP TABLE IF EXISTS trx_item';
  private readonly CREATE_ITEM = `CREATE TABLE IF NOT EXISTS trx_item (
                                    id VARCHAR(40) PRIMARY KEY, 
                                    quantity INTEGER NOT NULL, 
                                    product_id VARCHAR(40) NOT NULL REFERENCES mst_product(id),
                                    order_id VARCHAR(40) NOT NULL REFERENCES trx_order(id)
                                  )`;

  private readonly createQueries = [
    this.DROP_AUTHORITY,
    this.DROP_ROLE,
    this.DROP_ROLE_AUTHORITY,
    this.DROP_USER,
    this.DROP_CURRENCY,
    this.DROP_CATEGORY,
    this.DROP_PRODUCT,
    this.DROP_ORDER,
    this.DROP_ITEM,

    this.CREATE_AUTHORITY,
    this.CREATE_ROLE,
    this.CREATE_ROLE_AUTHORITY,
    this.CREATE_USER,
    this.CREATE_CURRENCY,
    this.CREATE_CATEGORY,
    this.CREATE_PRODUCT,
    this.CREATE_ORDER,
    this.CREATE_ITEM,
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
       
        let insertUser: string = `INSERT INTO  
          mst_user(id, username, password, fullname, role_id, activated, image, created_by, created_date)
          values(?, ?, ?, ?, ?, ?, ?, 'system', datetime('now','localtime'))`;
        tx.executeSql(insertUser, ['user-0000-0000-0000-000', 'system', 'password', 'system', null, true, DEFAULT_IMAGE]);

        let insertAuthority: string = `INSERT INTO 
          mst_authority (id, name, description) 
          values(?, ?, ?)`;
        tx.executeSql(insertAuthority, ['authority-0000-0000-0000-001', 'BASIC_AUTHORITY', 'Basic Authority']);
        tx.executeSql(insertAuthority, ['authority-0000-0000-0000-002', 'AUTHORITY_VIEW', 'View Authority Data']);
        tx.executeSql(insertAuthority, ['authority-0000-0000-0000-003', 'ROLE_VIEW', 'View Role Data']);
        tx.executeSql(insertAuthority, ['authority-0000-0000-0000-004', 'ROLE_CHANGE', 'Change Role Data']);
        tx.executeSql(insertAuthority, ['authority-0000-0000-0000-005', 'USER_VIEW', 'View User Data']);
        tx.executeSql(insertAuthority, ['authority-0000-0000-0000-006', 'USER_CHANGE', 'Change User Data']);
        tx.executeSql(insertAuthority, ['authority-0000-0000-0000-007', 'MENU_VIEW', 'View Menu Data']);
        tx.executeSql(insertAuthority, ['authority-0000-0000-0000-008', 'MENU_CHANGE', 'Change Menu Data']);
        tx.executeSql(insertAuthority, ['authority-0000-0000-0000-009', 'CATEGORY_VIEW', 'View Category Data']);
        tx.executeSql(insertAuthority, ['authority-0000-0000-0000-010', 'CATEGORY_CHANGE', 'Change Category Data']);
        tx.executeSql(insertAuthority, ['authority-0000-0000-0000-011', 'PRODUCT_VIEW', 'View Product Data']);
        tx.executeSql(insertAuthority, ['authority-0000-0000-0000-012', 'PRODUCT_CHANGE', 'Change Product Data']);
        tx.executeSql(insertAuthority, ['authority-0000-0000-0000-013', 'ORDER_VIEW', 'View Order Data']);
        tx.executeSql(insertAuthority, ['authority-0000-0000-0000-014', 'ORDER_CHANGE', 'Change Order Data']);
        tx.executeSql(insertAuthority, ['authority-0000-0000-0000-015', 'SETTING_VIEW', 'View Setting Data']);
        tx.executeSql(insertAuthority, ['authority-0000-0000-0000-016', 'SETTING_CHANGE', 'Change Setting Data']);
        tx.executeSql(insertAuthority, ['authority-0000-0000-0000-017', 'DATABASE_VIEW', 'View DB Data']);
        tx.executeSql(insertAuthority, ['authority-0000-0000-0000-018', 'DATABASE_CHANGE', 'Change DB Data']);
        tx.executeSql(insertAuthority, ['authority-0000-0000-0000-019', 'CURRENCY_VIEW', 'View Currency Data']);
        tx.executeSql(insertAuthority, ['authority-0000-0000-0000-020', 'CURRENCY_CHANGE', 'Change Currency Data']);

        let insertRole: string = `INSERT INTO 
          mst_role (id, name, description, created_by, created_date) 
          values(?, ?, ?, 'system', datetime('now','localtime'))`;
        tx.executeSql(insertRole, ['role-0000-0000-0000-001', 'Admin', 'Role as Admin']);
        tx.executeSql(insertRole, ['role-0000-0000-0000-002', 'Manager', 'Role as Manager']);
        tx.executeSql(insertRole, ['role-0000-0000-0000-003', 'Employee', 'Role as Employee']);

        let insertRoleAuthority: string = `INSERT INTO 
          mst_role_authority (role_id, authority_id) 
          values(?, ?)`;
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-001']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-002']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-003']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-004']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-005']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-006']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-007']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-008']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-009']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-009']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-011']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-012']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-013']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-014']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-015']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-016']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-017']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-018']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-019']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-001', 'authority-0000-0000-0000-020']);

        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-001']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-002']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-003']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-004']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-005']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-006']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-007']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-008']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-009']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-009']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-011']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-012']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-013']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-014']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-015']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-016']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-017']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-018']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-019']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-002', 'authority-0000-0000-0000-020']);

        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-003', 'authority-0000-0000-0000-001']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-003', 'authority-0000-0000-0000-002']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-003', 'authority-0000-0000-0000-003']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-003', 'authority-0000-0000-0000-004']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-003', 'authority-0000-0000-0000-005']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-003', 'authority-0000-0000-0000-006']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-003', 'authority-0000-0000-0000-007']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-003', 'authority-0000-0000-0000-008']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-003', 'authority-0000-0000-0000-009']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-003', 'authority-0000-0000-0000-009']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-003', 'authority-0000-0000-0000-011']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-003', 'authority-0000-0000-0000-012']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-003', 'authority-0000-0000-0000-013']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-003', 'authority-0000-0000-0000-014']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-003', 'authority-0000-0000-0000-015']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-003', 'authority-0000-0000-0000-016']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-003', 'authority-0000-0000-0000-017']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-003', 'authority-0000-0000-0000-018']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-003', 'authority-0000-0000-0000-019']);
        tx.executeSql(insertRoleAuthority, ['role-0000-0000-0000-003', 'authority-0000-0000-0000-020']);

        tx.executeSql(insertUser, ['user-0000-0000-0000-001', 'admin', 'password', 'Admin', 'role-0000-0000-0000-001', true, DEFAULT_IMAGE]);
        tx.executeSql(insertUser, ['user-0000-0000-0000-002', 'manager', 'password', 'Manager', 'role-0000-0000-0000-001', true, DEFAULT_IMAGE]);
        tx.executeSql(insertUser, ['user-0000-0000-0000-003', 'employee', 'password', 'Employee', 'role-0000-0000-0000-001', true, DEFAULT_IMAGE]);

        let insertCurrency: String = `INSERT INTO 
        mst_currency(id, name, description, created_by, created_date) 
        VALUES (?, ?, ?, 'system', datetime('now','localtime'))`;
        tx.executeSql(insertCurrency, ['currency-0000-0000-0000-001', 'IDR', 'Indonesian Rupiah']);
        tx.executeSql(insertCurrency, ['currency-0000-0000-0000-002', 'USD', 'US Dollar']);

        let insertCategory: String = `INSERT INTO 
        mst_category(id, name, description, image, created_by, created_date) 
        VALUES (?, ?, ?, ?, 'system', datetime('now','localtime'))`;
        tx.executeSql(insertCategory, ['category-0000-0000-0000-001', 'Category 001', 'Category description 001', DEFAULT_IMAGE]);
        // tx.executeSql(insertCategory, ['category-0000-0000-0000-002', 'Category 002', 'Category description 002', DEFAULT_IMAGE]);
        // tx.executeSql(insertCategory, ['category-0000-0000-0000-003', 'Category 003', 'Category description 003', DEFAULT_IMAGE]);
        // tx.executeSql(insertCategory, ['category-0000-0000-0000-004', 'Category 004', 'Category description 004', DEFAULT_IMAGE]);
        // tx.executeSql(insertCategory, ['category-0000-0000-0000-005', 'Category 005', 'Category description 005', DEFAULT_IMAGE]);
        // tx.executeSql(insertCategory, ['category-0000-0000-0000-006', 'Category 006', 'Category description 006', DEFAULT_IMAGE]);
        // tx.executeSql(insertCategory, ['category-0000-0000-0000-007', 'Category 007', 'Category description 007', DEFAULT_IMAGE]);
        // tx.executeSql(insertCategory, ['category-0000-0000-0000-008', 'Category 008', 'Category description 008', DEFAULT_IMAGE]);
        // tx.executeSql(insertCategory, ['category-0000-0000-0000-009', 'Category 009', 'Category description 009', DEFAULT_IMAGE]);
        // tx.executeSql(insertCategory, ['category-0000-0000-0000-010', 'Category 010', 'Category description 010', DEFAULT_IMAGE]);
        // tx.executeSql(insertCategory, ['category-0000-0000-0000-011', 'Category 011', 'Category description 011', DEFAULT_IMAGE]);
        // tx.executeSql(insertCategory, ['category-0000-0000-0000-012', 'Category 012', 'Category description 012', DEFAULT_IMAGE]);
        // tx.executeSql(insertCategory, ['category-0000-0000-0000-013', 'Category 013', 'Category description 013', DEFAULT_IMAGE]);
        // tx.executeSql(insertCategory, ['category-0000-0000-0000-014', 'Category 014', 'Category description 014', DEFAULT_IMAGE]);
        // tx.executeSql(insertCategory, ['category-0000-0000-0000-015', 'Category 015', 'Category description 015', DEFAULT_IMAGE]);
        
        let insertProduct: String = `INSERT INTO 
        mst_product(id, name, description, price, image, category_id, created_by, created_date) 
        VALUES (?, ?, ?, ?, ?, ?, 'system', datetime('now','localtime'))`;
        tx.executeSql(insertProduct, ['product-0000-0000-0000-001', 'Product 001', 'Product description 015', 150000, DEFAULT_IMAGE, 'category-0000-0000-0000-001']);

      }).then((result) => {
        resolve('Insert sample data is success');
      }).catch((error) => {
        reject(error);
      });
    });
  }

}
