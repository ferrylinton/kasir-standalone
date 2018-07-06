import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { BaseProvider } from './base';
import { DataProvider } from './data';
import { UtilProvider } from '../util/util';
import { CurrencyProvider } from '../../providers/currency/currency';
import { ProductProvider } from '../product/product';
import { Currency } from '../../models/currency.model';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';


@Injectable()
export class CurrencyProviderImpl extends BaseProvider<Currency> implements CurrencyProvider {

  constructor(
    public utilProvider: UtilProvider,
    public dataProvider: DataProvider,
    public productProvider: ProductProvider
  ) {
    super(dataProvider.currencies);
  }

  findByName(name: string, pageable: Pageable): Observable<Page<Currency>> {
    let datas: Array<Currency> = this.datas;

    if (name && name.trim() != '') {
      datas = this.utilProvider.filterObject(datas, 'name', name);
    }

    if (pageable.sort != null) {
      datas = this.utilProvider.sortObject(datas, pageable.sort);
    }

    return of(this.getPage(datas, pageable));
  }

  findAll(): Observable<Array<Currency>> {
    return of(this.datas);
  }

}
