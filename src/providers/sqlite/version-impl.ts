import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

import * as VERSION from './version-query';
import { BaseSQlite } from './base';
import { VersionProvider } from '../version/version';


@Injectable()
export class VersionProviderImpl extends BaseSQlite implements VersionProvider {

  constructor(public sqlite: SQLite, public storage: Storage) {
    super(sqlite, storage);
  }

  findLatest(): Observable<string> {
    return fromPromise(this.connect()
      .then(() => this.executeSqlFindLatest()));
  }


  private executeSqlFindLatest(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.db.executeSql(VERSION.FIND_LATEST, []).then((data) => {
        if (data.rows.length > 0) {
          resolve(data.rows.item(0));
        } else {
          resolve('0.0.0');
        }
      }).catch((error) => {
        reject(error);
      });
    })
  }

}
