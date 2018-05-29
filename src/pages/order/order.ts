import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { BaseCart } from '../base/base-cart';
import { UtilProvider } from '../../providers/util/util';
import { OrderProvider } from '../../providers/order/order';
import { Order } from "../../models/order.model";
import { Page } from '../../models/page.model';


@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage extends BaseCart {

  order: Order;

  page: Page<Order>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public util: UtilProvider,
    public orderProvider: OrderProvider) {

    super(storage, util);
    this.init();
    this.initPage();
    this.loadData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad');
    
  }

  ionViewWillEnter() {
    
  }

  viewOrder() {
    this.navCtrl.push('OrderPage');
  }

  private init() {
    this.getTotalItems();
    this.getTotalPrice();
    this.getOrder().then(order => {
      this.order = order;
    });
  }

  private initPage(): void {
    this.page = new Page();
    this.page.size = 5;
    this.page.sort.column = 'createdDate';
    this.page.sort.isAsc = false;
  }

  private loadData() {
    this.orderProvider.findByDate(new Date(), this.page).subscribe(page => {
      this.page.pageNumber = page.pageNumber;
      this.page.totalData = page.totalData;
      this.page.data = [...this.page.data, ...page.data];
    })
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.page.pageNumber = this.page.pageNumber + 1;
      this.loadData();
      infiniteScroll.complete();
    }, 2000);
  }

}
