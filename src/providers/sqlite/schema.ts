import { Injectable } from '@angular/core';
import { BaseDb } from '../db/base-db';
import { SQLite } from '@ionic-native/sqlite';
import { Observable } from 'rxjs/Observable';


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
                                        role_id VARCHAR(40),
                                        authority_id VARCHAR(40)
                                      )`;

  private readonly DROP_USER = 'DROP TABLE IF EXISTS mst_user';
  private readonly CREATE_USER = `CREATE TABLE IF NOT EXISTS mst_user (
                                      id VARCHAR(40) PRIMARY KEY,
                                      username VARCHAR(30) NOT NULL UNIQUE, 
                                      password VARCHAR(50) NOT NULL, 
                                      fullname VARCHAR(150) NOT NULL, 
                                      role VARCHAR(40) NOT NULL,
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
                                      category VARCHAR(40) NOT NULL REFERENCES mst_category(id),
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
        let current: Date = new Date();

        let insertCurrencies: String = 'INSERT INTO mst_currency(id, name, description, created_by, created_date) VALUES (?, ?, ?, ?, ?)';
        tx.executeSql(insertCurrencies, ['eba61b8f-2f9e-4520-9dc4-currency1', 'IDR', 'Indonesian Rupiah', 'system', current]);
        tx.executeSql(insertCurrencies, ['eba61b8f-2f9e-4520-9dc4-currency2', 'USD', 'US Dollar', 'system', current]);
        tx.executeSql(insertCurrencies, ['eba61b8f-2f9e-4520-9dc4-currency3', 'xxxx', 'system', current]);
      }).then((result) => {
        resolve('Insert sample data is success');
      }).catch((error) => {
        reject(error);
      });
    });
  }

}
