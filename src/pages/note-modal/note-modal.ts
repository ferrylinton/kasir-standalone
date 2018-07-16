import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { OrderItem } from '../../models/order-item.model';


@IonicPage()
@Component({
  selector: 'page-note-modal',
  templateUrl: 'note-modal.html',
})
export class NoteModalPage {

  orderItem: OrderItem;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.orderItem = navParams.get('orderItem');
  }

}
