import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { BaseSQlite } from './base';
import { AuthorityProvider } from '../authority/authority';
import { Authority } from '../../models/authority.model';


@Injectable()
export class AuthorityProviderImpl extends BaseSQlite implements AuthorityProvider {

  constructor(public sqlite: SQLite) {
    super(sqlite);
  }
  
  findAll(): Observable<Authority[]> {
    return fromPromise(this.connect().then(db => this.executeSqlFindAll(db)));
  }

  findByRole(role: string): Observable<string[]> {
    return fromPromise(this.connect().then(db => this.executeSqlFindByRole(db, role)));
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
  
  private executeSqlFindAll(db: any): Promise<Array<Authority>> {
    let query = 'SELECT * FROM mst_authority ORDER BY name';

    return new Promise((resolve, reject) => {
      db.executeSql(query, []).then((data) => {
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

  private executeSqlFindByRole(db: any, role: string): Promise<Array<string>> {
    let query = `SELECT aut.name 
    FROM mst_authority aut
    LEFT JOIN mst_role_authority rol ON aut.name = rol.authority_name 
    WHERE rol.role_name = ? `;

    return new Promise((resolve, reject) => {
      db.executeSql(query, [role]).then((data) => {
        let authorities: Array<string> = new Array();

        for (let i: number = 0; i < data.rows.length; i++) {
          authorities.push(data.rows.item(i)['name']);
        }

        resolve(authorities);
      }).catch((error) => {
        reject(error);
      })
    });
  }

  private convertToAuthority(item: any): Authority {
    return new Authority(
      item['id'],
      item['name'],
      item['description']
    );
  }
  
}
