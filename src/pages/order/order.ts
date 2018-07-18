import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Events } from 'ionic-angular';

import { MessageProvider } from '../../providers/message/message';
import { CartProvider } from '../../providers/cart/cart';
import { OrderProvider } from '../../providers/order/order';
import { Order } from "../../models/order.model";
import { Page } from '../../models/page.model';
import { BaseCartPage } from '../base/base-cart';
import { PAGE } from '../../constant/constant';


@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage extends BaseCartPage {

  segment = 'OrderPage';

  order: Order;

  page: Page<Order>;

  monthShortNames: Array<string> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  orderDate: string = new Date().toISOString();

  min: string;

  max: string;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public translate: TranslateService,
    public messageProvider: MessageProvider,
    public events: Events,
    public orderProvider: OrderProvider,
    public cartProvider: CartProvider) {

    super(modalCtrl, cartProvider);
  }

  ionViewWillEnter() {
    this.initDatePicker();
    this.cartProvider.getCart().subscribe(cart => {
      this.cart = cart;
    })
    this.initPage();
    this.loadData(this.orderDate);
  }

  private initDatePicker(): void {
    let minDate: Date = new Date();
    let maxDate: Date = new Date();

    minDate.setMonth(minDate.getMonth() - 12);

    this.min = minDate.toJSON().split('T')[0];
    this.max = maxDate.toJSON().split('T')[0];

    this.translate.get('MONTH_NAMES').subscribe(value => {
      this.monthShortNames = value;
    });
  }

  private initPage(): void {
    this.page = new Page();
  }

  private loadData(orderDate: string) {
    this.error = null;
    this.orderProvider.findByDate(new Date(orderDate), this.page).subscribe(page => {
      this.page.pageNumber = page.pageNumber;
      this.page.totalData = page.totalData;
      this.page.data = [...this.page.data, ...page.data];
    }, error => {
      this.error = 'Error : ' + error;
    });
  }

  showOrder(order: Order) {
    let clone: Order = JSON.parse(JSON.stringify(order)) ;
    let orderModal = this.modalCtrl.create('OrderModalPage', { order: clone });
    orderModal.onDidDismiss(order => {
      if (order) {
        this.events.publish(PAGE, { page: 'CartPage', params: { order: order } });
      }
    })
    orderModal.present();
  }

  doInfinite(infiniteScroll) {
    this.page.pageNumber = this.page.pageNumber + 1;
    this.loadData(this.orderDate);
    infiniteScroll.complete();
  }

  search() {
    this.initPage();
    this.loadData(this.orderDate);
  }

  cancelOrder(order: Order) {
    order.note = order.note ? order.note : '';
    const cancelOrderModal = this.modalCtrl.create('CancelOrderModalPage', { order: order }, { cssClass: 'cancel-order-modal' });
    cancelOrderModal.onDidDismiss(order => {
      if (order) {
        order.canceled = true;
        this.orderProvider.update(order).subscribe(order => {
          this.search();
        });
      }
    });
    cancelOrderModal.present();
  }

  updateContent(): void {
    this.events.publish(PAGE, { page: this.segment, params: {} });
  }

}
