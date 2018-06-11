import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { forkJoin } from 'rxjs/observable/forkJoin';

import { BaseCart } from '../base/base-cart';
import { CommonProvider } from '../../providers/common/common';
import { SettingProvider } from '../../providers/setting/setting';
import { MessageProvider } from '../../providers/message/message';
import { CartProvider } from '../../providers/cart/cart';
import { OrderProvider } from '../../providers/order/order';
import { Order } from "../../models/order.model";
import { Page } from '../../models/page.model';


@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage extends BaseCart {

  page: Page<Order>;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public translateService: TranslateService,
    public loadingCtrl: LoadingController,
    public messageProvider: MessageProvider,
    public settingProvider: SettingProvider,
    public commonProvider: CommonProvider,
    public orderProvider: OrderProvider,
    public cartProvider: CartProvider) {

    super(modalCtrl, loadingCtrl, translateService, commonProvider, settingProvider, cartProvider);
    this.initPage();
  }

  private initPage(): void {
    this.page = new Page();
    this.page.size = 5;
    this.page.sort.column = 'createdDate';
    this.page.sort.isAsc = false;
  }

  ionViewWillEnter() {
    this.loadData(this.navParams.get('order'));
    this.loadOrderHistory();
  }

  private loadData(order: Order) {
    this.startLoading();
    forkJoin([this.cartProvider.getCart(order), this.orderProvider.findByDate(new Date(), this.page)])
      .subscribe(results => {
        this.cart = results[0];
        this.setPage(results[1]);
        this.loading.dismiss();
      });
  }

  private loadOrderHistory() {
    this.orderProvider.findByDate(new Date(), this.page).subscribe(page => {
      this.page.pageNumber = page.pageNumber;
      this.page.totalData = page.totalData;
      this.page.data = page.data;
    })
  }

  showOrder(order: Order) {
    const orderModal = this.modalCtrl.create('OrderModalPage', { order: order });
    orderModal.onDidDismiss(order => {
      if (order) {
        this.cartProvider.setCart(order).subscribe(cart => {
          this.cart = cart;
        });
      }
    })
    orderModal.present();
  }

  refresh() {
    this.commonProvider.goToPage('OrderPage', {});
  }

  productList() {
    this.commonProvider.goToPage('ProductListPage', {});
  }

  getProducts(order: Order): string {
    return this.commonProvider.getProductFromOrder(order);
  }

  previous(): void {
    if (this.page.pageNumber > 1) {
      this.page.pageNumber = this.page.pageNumber - 1
      this.loadOrderHistory();
    }
  }

  next(): void {
    if (this.page.pageNumber < this.page.getTotalPage()) {
      this.page.pageNumber = this.page.pageNumber + 1
      this.loadOrderHistory();
    }
  }

  pay() {
    const orderModal = this.modalCtrl.create('PaymentPage', { order: this.cart.order });
    orderModal.onDidDismiss(order => {
      if (order) {
        this.save();
      }
    });
    orderModal.present();
  }

  create() {
    this.cartProvider.createOrder();
  }

  private save(): void {
    if (this.cart.order.isPaid) {
      this.commonProvider.getLoggedUser().subscribe(user => {
        this.cart.order.lastModifiedBy = user.username;
        this.cart.order.lastModifiedDate = new Date();
        this.orderProvider.update(this.cart.order).subscribe(order => {
          this.loadData(order);
          this.deleteCallback();
        });

      });
    } else {
      this.commonProvider.getLoggedUser().subscribe(user => {
        this.cart.order.createdBy = user.username;
        this.cart.order.createdDate = new Date();
        this.orderProvider.save(this.cart.order).subscribe(order => {
          this.loadData(order);
          this.deleteCallback();
        });
      });
    }
  }

  deleteCallback(): void {
    this.cartProvider.createOrder().subscribe(order => {
      this.loadData(order);
    });
  }

  delete() {
    this.messageProvider.showDeleteConfirm(this.orderTxt, (category) => this.deleteCallback());
  }

  private setPage(page: Page<Order>): void {
    this.page.pageNumber = page.pageNumber;
    this.page.totalData = page.totalData;
    this.page.data = page.data;
  }

}
