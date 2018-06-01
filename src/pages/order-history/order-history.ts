import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { AuthorityProvider } from '../../providers/authority/authority';
import { OrderProvider } from '../../providers/order/order';

import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';
import { Order } from '../../models/order.model';


@IonicPage()
@Component({
  selector: 'page-order-history',
  templateUrl: 'order-history.html',
})
export class OrderHistoryPage {

  pageable: Pageable;

  page: Page<Order>;

  constructor(
    public navCtrl: NavController,
    public authorityProvider: AuthorityProvider,
    public orderProvider: OrderProvider) {

    this.init();
  }

  ionViewWillEnter() {
    this.init();
  }

  private init(): void {
    this.pageable = new Pageable(1);
    this.loadData(this.pageable);
  }

  private loadData(pageable: Pageable) {
    this.orderProvider.find(pageable).subscribe(page => {
      this.page = page;
    })
  }

  previous(): void {
    if (this.pageable.pageNumber > 1) {
      this.pageable = new Pageable(this.page.pageNumber - 1, this.page.totalData);
      this.loadData(this.pageable);
    }
  }

  next(): void {
    if (this.pageable.pageNumber < this.page.getTotalPage()) {
      this.pageable = new Pageable(this.page.pageNumber + 1, this.page.totalData);
      this.loadData(this.pageable);
    }
  }

  view(order: Order) {
    this.navCtrl.push('OrderDetailPage', {
      order: order
    });
  }

}
