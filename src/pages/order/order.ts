import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Events } from 'ionic-angular';
import moment from 'moment';

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

  monthShortNames: string;

  orderDate: string;

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

    super(modalCtrl, translate, cartProvider);
    this.initTranslate();
  }

  ionViewWillEnter() {
    this.initDatePicker();
    this.cartProvider.getCart().subscribe(cart => {
      this.cart = cart;
    })
    this.page = new Page();
    this.loadOrders(this.orderDate);
  }

  private initTranslate(): void {
    this.translate.get('MONTH_NAMES').subscribe(value => {
      this.monthShortNames = value;
    });
  }

  private initDatePicker(): void {
    moment.locale(this.translate.currentLang);
    this.orderDate = moment().format('YYYY-MM-DD'); 
    this.min = moment().subtract(3, 'months').startOf('month').format('YYYY-MM-DD');
    this.max = moment().format('YYYY-MM-DD');
  }

  private loadOrders(orderDate: string) {
    this.message = null;
    this.orderProvider.findByDate(new Date(orderDate), this.page).subscribe(page => {
      this.setPage(page);
    }, error => {
      this.message = 'Error : ' + error;
    });
  }

  showOrder(order: Order) {
    let clone: Order = JSON.parse(JSON.stringify(order));
    let orderModal = this.modalCtrl.create('OrderModalPage', { order: clone });
    orderModal.onDidDismiss((order, operation) => {
      if (order && operation == 'modify') {
        this.events.publish(PAGE, { page: 'CartPage', params: { order: order } });
      }else if (order && operation == 'cancel') {
        order.canceled = true;
        this.orderProvider.update(order).subscribe(order => {
          this.search();
        });
      }
    })
    orderModal.present();
  }

  doInfinite(infiniteScroll) {
    this.page.pageNumber = this.page.pageNumber + 1;
    this.loadOrders(this.orderDate);
    infiniteScroll.complete();
  }

  search() {
    this.page = new Page();
    this.loadOrders(this.orderDate);
  }

  updateContent(): void {
    this.events.publish(PAGE, { page: this.segment, params: {} });
  }

}
