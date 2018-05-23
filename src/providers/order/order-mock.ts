import { Injectable } from '@angular/core';
import { MockProvider } from '../mock/mock';
import { DataProvider } from '../data/data';
import { OrderProvider } from './order';
import { Order } from '../../models/order.model';

@Injectable()
export class OrderMockProvider extends MockProvider<Order> implements OrderProvider {

  constructor(public dataProvider: DataProvider) {
    super();
    this.init();
  }

  private init(): void {
    this.setDatas(this.dataProvider.orders);
  }

}
