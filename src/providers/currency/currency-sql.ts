import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { UtilProvider } from '../util/util';
import { MockProvider } from '../mock/mock';
import { DataProvider } from '../data/data';
import { CurrencyProvider } from '../../providers/currency/currency';
import { ProductProvider } from '../product/product';
import { Currency } from '../../models/currency.model';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';


@Injectable()
export class CurrencySQLiteProvider implements CurrencyProvider {

  findAll(): Observable<Currency[]> {
    throw new Error("Method not implemented.");
  }

  findByName(name: string, pageable: Pageable): Observable<Page<Currency>> {
    throw new Error("Method not implemented.");
  }

  findById(id: string): Observable<Currency> {
    throw new Error("Method not implemented.");
  }

  find(pageable: Pageable): Observable<Page<Currency>> {
    throw new Error("Method not implemented.");
  }

  save(data: Currency): Observable<Currency> {
    throw new Error("Method not implemented.");
  }

  update(data: Currency): Observable<Currency> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Observable<Currency> {
    throw new Error("Method not implemented.");
  }

}
