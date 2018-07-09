import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

import * as ROLE from './role-query';
import { BaseSQlite } from './base';
import { RoleProvider } from '../role/role';
import { Role } from '../../models/role.model';


@Injectable()
export class RoleProviderImpl extends BaseSQlite implements RoleProvider {

  constructor(public sqlite: SQLite) {
    super(sqlite);
  }
  
  findAll(): Observable<Role[]> {
    return fromPromise(this.connect().then(() => this.executeSqlFindAll()));
  }

  private executeSqlFindAll(): Promise<Array<Role>> {
    return new Promise((resolve, reject) => {
      this.db.executeSql(ROLE.FIND_ALL, []).then((data) => {
        let roles: Array<Role> = new Array();
        let role: Role;

        for (let i: number = 0; i < data.rows.length; i++) {
          if(!role){
            role = this.convertToRole(data.rows.item(i));
          }else if(role['id'] != data.rows.item(i)['id']){
            role.authorities.push(this.convertToAuthority(data.rows.item(i)));
            roles.push(role);
            role = this.convertToRole(data.rows.item(i));
          }else if(role['id'] == data.rows.item(i)['id']){
            role.authorities.push(this.convertToAuthority(data.rows.item(i)));
          }
        }

        resolve(roles);
      }).catch((error) => {
        reject(error);
      })
    });
  }
  
}
