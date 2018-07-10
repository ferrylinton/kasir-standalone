import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

import * as ROLE from './role-query';
import { BaseSQlite } from './base';
import { RoleProvider } from '../role/role';
import { Role } from '../../models/role.model';


@Injectable()
export class RoleProviderImpl extends BaseSQlite implements RoleProvider {

  constructor(public sqlite: SQLite, public storage: Storage) {
    super(sqlite, storage);
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
          }else if(role.id != data.rows.item(i)['role_id']){
            // insert role to array
            roles.push(role);

            // create new role
            role = this.convertToRole(data.rows.item(i));
            role.authorities.push(this.convertToAuthority(data.rows.item(i)));
          }else if(role.id == data.rows.item(i)['role_id']){
            role.authorities.push(this.convertToAuthority(data.rows.item(i)));
          }
        }
        // insert role to array
        roles.push(role);
        resolve(roles);
      }).catch((error) => {
        reject(error);
      })
    });
  }
  
}
