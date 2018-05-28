import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { BaseCart } from '../base/base-cart';
import { UtilProvider } from '../../providers/util/util';
import { OrderProvider } from '../../providers/order/order';
import { Order } from "../../models/order.model";



@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage extends BaseCart {

  order: Order;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public util: UtilProvider,
    public orderProvider: OrderProvider) {

    super(storage, util);
    console.log('constructor');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad');
    this.init();
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
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

}
