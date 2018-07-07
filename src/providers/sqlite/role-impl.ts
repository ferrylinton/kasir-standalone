import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { BaseDb } from '../db/base-db';
import { RoleProvider } from '../role/role';
import { Role } from '../../models/role.model';


@Injectable()
export class RoleProviderImpl extends BaseDb implements RoleProvider {

  constructor(public sqlite: SQLite) {
    super(sqlite);
  }
  
  findAll(): Observable<Role[]> {
    throw new Error("Method not implemented.");
  }
  save(data: Role): Observable<Role> {
    throw new Error("Method not implemented.");
  }
  update(data: Role): Observable<Role> {
    throw new Error("Method not implemented.");
  }
  delete(id: any): Observable<any> {
    throw new Error("Method not implemented.");
  }
  

  
}
