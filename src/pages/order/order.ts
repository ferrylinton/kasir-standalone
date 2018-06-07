import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { forkJoin } from 'rxjs/observable/forkJoin';

import * as Setting from '../../constant/setting';
import { CommonProvider } from '../../providers/common/common';
import { SettingProvider } from '../../providers/setting/setting';
import { CartProvider } from '../../providers/cart/cart';
import { OrderProvider } from '../../providers/order/order';
import { Order } from "../../models/order.model";
import { Page } from '../../models/page.model';


@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  private loadingTxt: string = 'Please wait...';

  lang: string = Setting.DEFAULT_LANGUAGE;

  currency: string = Setting.DEFAULT_CURRENCY + ' ';

  symbol: string = Setting.DEFAULT_CURRENCY_SYMBOL;

  loading: Loading;

  order: Order;

  page: Page<Order>;

  totalItem: number = 0;

  totalPrice: number = 0;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public translateService: TranslateService,
    public loadingCtrl: LoadingController,
    public settingProvider: SettingProvider,
    public commonProvider: CommonProvider,
    public orderProvider: OrderProvider,
    public cartProvider: CartProvider) {

    this.initSetting();
    this.initLanguage();
    this.initOrder();
    this.initPage();
  }

  ionViewWillEnter() {
    this.startLoading();
    forkJoin([
      this.cartProvider.getTotalItem(),
      this.cartProvider.getTotalPrice(),
      this.cartProvider.getOrder(),
      this.orderProvider.findByDate(new Date(), this.page)])
      .subscribe(results => {

        this.totalItem = results[0];
        this.totalPrice = results[1];
        this.order = results[2];
        this.page.pageNumber = results[3].pageNumber;
        this.page.totalData = results[3].totalData;
        this.page.data = results[3].data;
        this.loading.dismiss();
      });
  }

  private initLanguage() {
    this.translateService.get('MESSAGE.LOADING').subscribe(val => {
      this.loadingTxt = val;
    });
  }

  private initSetting(): void {
    this.settingProvider.getSetting().subscribe(setting => {
      this.lang = setting[Setting.LANGUAGE];
      this.currency = setting[Setting.CURRENCY] + ' ';
      this.symbol = setting[Setting.CURRENCY_SYMBOL];
    });
  }

  private initOrder(): void {
    if (this.navParams.get('order')) {
      this.cartProvider.setOrder(this.navParams.get('order'));
    }
  }

  private initPage(): void {
    this.page = new Page();
    this.page.size = 5;
    this.page.sort.column = 'createdDate';
    this.page.sort.isAsc = false;
  }

  private loadOrderHistory() {
    this.orderProvider.findByDate(new Date(), this.page).subscribe(page => {
      this.page.pageNumber = page.pageNumber;
      this.page.totalData = page.totalData;
      this.page.data = page.data;
    })
  }

  private startLoading(): void {
    this.loading = this.loadingCtrl.create({
      content: this.loadingTxt
    });

    this.loading.present();
  }

  showOrder(order: Order) {
    const orderModal = this.modalCtrl.create('OrderModalPage', { order: order });
    orderModal.onDidDismiss(order => {
      if (order) {
        this.commonProvider.goToPage('OrderPage', { order: order });
      }
    })
    orderModal.present();
  }

  refresh() {
    this.commonProvider.goToPage('OrderPage', {});
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

}
