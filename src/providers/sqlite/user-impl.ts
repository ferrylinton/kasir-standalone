import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { BaseDb } from '../db/base-db';
import { UserProvider } from '../user/user';
import { User } from '../../models/user.model';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';


@Injectable()
export class UserProviderImpl extends BaseDb implements UserProvider {

  constructor(public sqlite: SQLite) {
    super(sqlite);
  }
  
  findByUsername(username: string): Observable<User> {
    throw new Error("Method not implemented.");
  }
  findByFullname(fullname: string, pageable: Pageable): Observable<Page<User>> {
    throw new Error("Method not implemented.");
  }
  save(data: User): Observable<User> {
    throw new Error("Method not implemented.");
  }
  update(data: User): Observable<User> {
    throw new Error("Method not implemented.");
  }
  delete(id: any): Observable<any> {
    throw new Error("Method not implemented.");
  }
 
  
  
  

  
}
