import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { PAGE_SIZE } from '../../constant/constant';

import { UtilProvider } from '../util/util';
import { MockProvider } from '../mock/mock';
import { DataProvider } from '../data/data';
import { OrderProvider } from './order';

import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';
import { Order } from '../../models/order.model';


@Injectable()
export class OrderMockProvider extends MockProvider<Order> implements OrderProvider {

  constructor(
    public dataProvider: DataProvider,
    public util: UtilProvider) {

    super();
    this.init();
  }

  private init(): void {
    this.setDatas(this.dataProvider.orders);
  }

  find(pageable: Pageable): Observable<Page<Order>> {
    let datas: Array<Order> = this.datas;

    if (pageable.sort != null) {
      datas = this.util.sortObject(datas, pageable.sort);
    }

    return of(this.getPage(datas, pageable));
  }

  findByDate(date: Date, pageable: Pageable): Observable<Page<Order>> {
    let datas: Array<Order> = this.util.filterByDate(this.datas, 'createdDate', date);

    if (pageable.sort != null) {
      datas = this.util.sortObject(datas, pageable.sort);
    }

    return of(this.getPage(datas, pageable));
  }

  findBetweenDate(startDate: Date, endDate: Date, pageable: Pageable): Observable<Page<Order>> {
    let datas: Array<Order> = this.util.filterBetweenDate(this.datas, 'createdDate', startDate, endDate);

    if (pageable.sort != null) {
      datas = this.util.sortObject(datas, pageable.sort);
    }

    return of(this.getPage(datas, pageable));
  }

}
