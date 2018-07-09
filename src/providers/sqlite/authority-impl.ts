import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

import * as AUTHORITY from '../../constant/query-authority';
import { BaseSQlite } from './base';
import { AuthorityProvider } from '../authority/authority';
import { Authority } from '../../models/authority.model';


@Injectable()
export class AuthorityProviderImpl extends BaseSQlite implements AuthorityProvider {

  constructor(public sqlite: SQLite) {
    super(sqlite);
  }
  
  findAll(): Observable<Authority[]> {
    return fromPromise(this.connect().then(() => this.executeSqlFindAll()));
  }

  private executeSqlFindAll(): Promise<Array<Authority>> {
    return new Promise((resolve, reject) => {
      this.db.executeSql(AUTHORITY.FIND_ALL, []).then((data) => {
        let authorities: Array<Authority> = new Array();

        for (let i: number = 0; i < data.rows.length; i++) {
          authorities.push(this.convertToAuthority(data.rows.item(i)));
        }

        resolve(authorities);
      }).catch((error) => {
        reject(error);
      })
    });
  }

}
