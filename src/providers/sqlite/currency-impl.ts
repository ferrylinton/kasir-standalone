import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

import * as CURRENCY from './currency-query';
import { BaseSQlite } from './base';
import { CurrencyProvider } from '../../providers/currency/currency';
import { Currency } from '../../models/currency.model';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';


@Injectable()
export class CurrencyProviderImpl extends BaseSQlite implements CurrencyProvider {

  constructor(public sqlite: SQLite) {
    super(sqlite);
  }

  findAll(): Observable<Array<Currency>> {
    return fromPromise(this.connect().then(() => this.executeSqlFindAll()));
  }

  findByName(name: string, pageable: Pageable): Observable<Page<Currency>> {
    return fromPromise(this.connect()
      .then(() => this.executeSqlCountByName(name, pageable))
      .then(pageable => this.executeSqlFindByName(name, pageable)));
  }

  save(currency: Currency): Observable<Currency> {
    let params = [currency.id, currency.name, currency.description, currency.createdBy];

    return fromPromise(this.connect()
      .then(() => this.executeSql(CURRENCY.INSERT, params)));
  }

  update(currency: Currency): Observable<Currency> {
    let params = [currency.name, currency.description, currency.lastModifiedBy, currency.id];
    
    return fromPromise(this.connect()
      .then(() => this.executeSql(CURRENCY.UPDATE, params)));
  }

  delete(id: string): Observable<Currency> {
    return fromPromise(this.connect()
      .then(() => this.executeSql(CURRENCY.DELETE, [id])));
  }

  private executeSqlFindAll(): Promise<Array<Currency>> {
    return new Promise((resolve, reject) => {
      this.db.executeSql(CURRENCY.FIND_ALL, []).then((data) => {
        resolve(this.convertToCurrencies(data));
      }).catch((error) => {
        reject(error);
      });
    });
  }

  private executeSqlCountByName(name: string, pageable: Pageable): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.executeSql(CURRENCY.COUNT_BY_NAME, ['%' + name.toLowerCase() + '%']).then((data) => {
        pageable.totalData = data.rows.item(0)['total']
        resolve(pageable);
      }).catch((error) => {
        reject(error);
      });
    })
  }

  private executeSqlFindByName(name: string, pageable: Pageable): Promise<Page<Currency>> {
    let params = this.createParams(['%' + name.toLowerCase() + '%'], pageable);

    return new Promise((resolve, reject) => {
      this.db.executeSql(CURRENCY.FIND_BY_NAME, params).then((data) => {
        resolve(new Page(this.convertToCurrencies(data), pageable.pageNumber, pageable.totalData, pageable.sort));
      }).catch((error) => {
        reject(error);
      });
    })
  }

  private convertToCurrencies(data: any): Array<Currency> {
    let currencies: Array<Currency> = new Array();

    for (let i: number = 0; i < data.rows.length; i++) {
      currencies.push(this.convertToCurrency(data.rows.item(i)));
    }

    return currencies;
  }


}
