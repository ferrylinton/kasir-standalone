
import { Injectable } from '@angular/core';
import { BaseDb } from '../db/base-db';
import { SQLite } from '@ionic-native/sqlite';
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";


@Injectable()
export class SchemaProvider extends BaseDb {

  private readonly DROP_CURRENCY = 'DROP TABLE IF EXISTS mst_currency';

  private readonly CREATE_CURRENCY = `CREATE TABLE IF NOT EXISTS mst_currency
                                        (id VARCHAR(40) PRIMARY KEY,
                                        name VARCHAR(50) NOT NULL UNIQUE,
                                        description VARCHAR(250),
                                        created_by VARCHAR(30),
                                        created_date DATE,
                                        last_modified_by VARCHAR(30),
                                        last_modified_date DATE)`;

  private readonly createQueries = [
    this.DROP_CURRENCY,
    this.CREATE_CURRENCY,
  ];

  constructor(public sqlite: SQLite) {
    super(sqlite);
  }

  createTables(): void {
    this.connect().then(db => {
      db.sqlBatch(this.createQueries);
      this.insertData(db);
    }).catch((error) => {
      console.log('createTables : ' + JSON.stringify(error));
    });
  }

  insertData(db: any): void {
    db.transaction((tx) => {
      let current: Date = new Date();

      let insertCurrencies: String = 'INSERT INTO mst_currency(id, name, description, created_by, created_date) VALUES (?, ?, ?, ?, ?)';
      tx.executeSql(insertCurrencies, ['eba61b8f-2f9e-4520-9dc4-currency1', 'IDR', 'Indonesian Rupiah', 'system', current]);
      tx.executeSql(insertCurrencies, ['eba61b8f-2f9e-4520-9dc4-currency2', 'USD', 'US Dollar', 'system', current]);

    });
  }
}
