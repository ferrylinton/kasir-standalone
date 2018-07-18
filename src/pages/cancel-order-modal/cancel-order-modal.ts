import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { Order } from '../../models/order.model';


@IonicPage()
@Component({
  selector: 'page-cancel-order-modal',
  templateUrl: 'cancel-order-modal.html',
})
export class CancelOrderModalPage {

  order: Order;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.order = navParams.get('order');
  }

}
