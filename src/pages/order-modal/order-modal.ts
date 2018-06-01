import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { BaseCart } from '../base/base-cart';
import { UtilProvider } from '../../providers/util/util';

import { Order } from '../../models/order.model';


@IonicPage()
@Component({
  selector: 'page-order-modal',
  templateUrl: 'order-modal.html',
})
export class OrderModalPage extends BaseCart {

  order: Order;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController, 
    public navParams: NavParams,
    public storage: Storage,
    public util: UtilProvider ) {
      
    super(storage, util);
    this.order = navParams.get('order');
    this.totalItems = (this.order == null) ? 0 : this.countItems(this.order);
    this.totalPrice = (this.order == null) ? 0 : this.countPrice(this.order);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderModalPage');
  }

  edit() {
    this.viewCtrl.dismiss(this.order);
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}
