import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { BaseCart } from '../base/base-cart';
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
    public storage: Storage) {

    super(storage);
    console.log('constructor');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad');
    this.init();
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
  }

  viewOrder(){
    this.navCtrl.push('OrderPage');
  }
  
  private init(){
    this.getTotalItems();
    this.getTotalPrice();
    this.getOrder().then(order => {
      this.order = order;
    });
  }

}
