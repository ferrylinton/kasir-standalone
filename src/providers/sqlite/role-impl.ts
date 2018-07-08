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

  private executeSqlFindAll(db: any): Promise<Array<Role>> {
    let query = `SELECT rol.*, rla.authority_name
    FROM mst_role rol 
    LEFT JOIN mst_role_authority rla ON rla.role_name = rol.name
    LEFT JOIN mst_authority aut ON aut.name = rla.authority_name 
    ORDER BY rol.name`;

    return new Promise((resolve, reject) => {
      db.executeSql(query, []).then((data) => {
        let roles: Array<Role> = new Array();
        let role: Role;


        for (let i: number = 0; i < data.rows.length; i++) {
          if(!role){
            role = this.convertToRole(data.rows.item(i));
          }else if(role['name'] != data.rows.item(i)['name']){
            role.authorities.push(data.rows.item(i)['authority_name'])
            roles.push(role);
            role = this.convertToRole(data.rows.item(i));
          }else if(role['name'] == data.rows.item(i)['name']){
            role.authorities.push(data.rows.item(i)['authority_name'])
          }
        }

        resolve(roles);
      }).catch((error) => {
        reject(error);
      })
    });
  }
  
  private convertToRole(item: any): Role {
    return new Role(
      item['id'],
      item['name'],
      item['description'],
      new Array<string>(),
      item['created_by'],
      item['created_date'],
      item['last_modified_by'],
      item['last_modified_date']
    );
  }

  
}
