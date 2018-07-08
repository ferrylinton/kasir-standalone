import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { BaseProvider } from './base';
import { DataProvider } from './data';
import { UtilProvider } from '../util/util';
import { OrderProvider } from '../order/order';

import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';
import { Order } from '../../models/order.model';


@Injectable()
export class OrderProviderImpl extends BaseProvider<Order> implements OrderProvider {

  constructor(
    public dataProvider: DataProvider,
    public util: UtilProvider) {

    super(dataProvider.orders);
  }

  findByDate(date: Date, pageable: Pageable): Observable<Page<Order>> {
    let datas: Array<Order> = this.util.filterByDate(this.datas, 'createdDate', date);

    if (pageable.sort != null) {
      datas = this.util.sortObject(datas, pageable.sort);
    }

    return of(this.getPage(datas, pageable));
  }

}
