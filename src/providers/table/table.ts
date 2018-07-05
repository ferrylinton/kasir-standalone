
import { Injectable } from '@angular/core';
import { BaseDb } from '../db/base-db';
import { SQLite } from '@ionic-native/sqlite';


@Injectable()
export class TableProvider extends BaseDb {

  private readonly CREATE_CURRENCY = `CREATE TABLE IF NOT EXISTS mst_currency
                                        (id text PRIMARY KEY,
                                        name text NOT NULL UNIQUE,
                                        description text NOT NULL)`;

  private readonly createQueries = [
    'DROP TABLE IF EXISTS people',
    'DROP TABLE IF EXISTS mst_currency',
    this.CREATE_CURRENCY,
  ];

  constructor(public sqlite: SQLite) {
    super(sqlite);
  }

  createTables(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.createDB().then((db) => {
        db.sqlBatch(this.createQueries);
        resolve();
      }).catch((error) => {
        console.log('table : ' + error);
        console.log('table : ' + JSON.stringify(error));
        reject(error);
      })
    });
  }

}
