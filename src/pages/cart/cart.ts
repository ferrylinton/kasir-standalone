import { Component } from '@angular/core';
import { IonicPage, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Events } from 'ionic-angular';

import { BaseCartPage } from '../base/base-cart';
import { MessageProvider } from '../../providers/message/message';
import { CartProvider } from '../../providers/cart/cart';
import { OrderProvider } from '../../providers/order/order';
import { Order } from "../../models/order.model";
import { Page } from '../../models/page.model';
import { PAGE } from '../../constant/constant';


@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage extends BaseCartPage {

  page: Page<Order>;

  segment = 'CartPage';

  constructor(
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public translate: TranslateService,
    public events: Events,
    public messageProvider: MessageProvider,
    public orderProvider: OrderProvider,
    public cartProvider: CartProvider) {

    super(loadingCtrl, modalCtrl, translate, cartProvider);
  }

  ionViewWillEnter() {
    this.loadOrder();
  }

  private loadOrder() {
    if (this.navParams.get('order')) {
      this.cartProvider.setCartFromOrder(this.navParams.get('order')).subscribe(cart => {
        this.cart = cart;
      });
    } else {
      this.cartProvider.getCart().subscribe(cart => {
        this.cart = cart;
      });
    }
  }

  pay() {
    const orderModal = this.modalCtrl.create('PaymentPage', { order: this.cart.order });
    orderModal.onDidDismiss(order => {
      if (order) {
        this.saveOrPay(true);
      }
    });
    orderModal.present();
  }

  save(): void {
    this.messageProvider.confirmSave(() => this.saveCallback());
  }

  delete(): void {
    this.messageProvider.confirmDelete(() => this.deleteOrderFromStorage());
  }

  private saveCallback() {
    this.saveOrPay(false);
  }

  private saveOrPay(paid: boolean): void {
    if (this.cart.isModified) {
      this.cart.order.paid = this.cart.order.paid || paid;
      this.cart.order.canceled = false;
      this.orderProvider.update(this.cart.order).subscribe(() => {
        this.deleteOrderFromStorage();
      });
    } else {
      this.cart.order.paid = paid;
      this.cart.order.canceled = false;
      this.orderProvider.save(this.cart.order).subscribe(() => {
        this.deleteOrderFromStorage();
      });
    }
  }

  private deleteOrderFromStorage(): void {
    this.cart = this.cartProvider.createNewCart();
    this.cartProvider.setCart(this.cart);
  }

  // Segment

  updateContent(): void {
    this.events.publish(PAGE, { page: this.segment, params: {} });
  }

}
