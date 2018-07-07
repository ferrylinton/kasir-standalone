import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { BaseDb } from '../db/base-db';
import { AuthorityProvider } from '../authority/authority';
import { Authority } from '../../models/authority.model';


@Injectable()
export class AuthorityProviderImpl extends BaseDb implements AuthorityProvider {

  constructor(public sqlite: SQLite) {
    super(sqlite);
  }
  
  findAll(): Observable<Authority[]> {
    throw new Error("Method not implemented.");
  }
  save(data: Authority): Observable<Authority> {
    throw new Error("Method not implemented.");
  }
  update(data: Authority): Observable<Authority> {
    throw new Error("Method not implemented.");
  }
  delete(id: any): Observable<any> {
    throw new Error("Method not implemented.");
  }
  

  
}
