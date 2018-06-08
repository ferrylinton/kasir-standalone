import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { forkJoin } from 'rxjs/observable/forkJoin';

import * as Setting from '../../constant/setting';
import { CommonProvider } from '../../providers/common/common';
import { SettingProvider } from '../../providers/setting/setting';
import { MessageProvider } from '../../providers/message/message';
import { CartProvider } from '../../providers/cart/cart';
import { OrderProvider } from '../../providers/order/order';
import { Order } from "../../models/order.model";
import { Page } from '../../models/page.model';


@IonicPage()
@Component({
  selector: 'page-order-history',
  templateUrl: 'order-history.html',
})
export class OrderHistoryPage {

  private loadingTxt: string = 'Please wait...';

  private orderTxt: string = 'Order';

  lang: string = Setting.DEFAULT_LANGUAGE;

  currency: string = Setting.DEFAULT_CURRENCY + ' ';

  symbol: string = Setting.DEFAULT_CURRENCY_SYMBOL;

  loading: Loading;

  order: Order;

  page: Page<Order>;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public translateService: TranslateService,
    public loadingCtrl: LoadingController,
    public settingProvider: SettingProvider,
    public commonProvider: CommonProvider,
    public orderProvider: OrderProvider) {

    this.initSetting();
    this.initLanguage();
    this.initPage();
  }

  ionViewWillEnter() {
    this.loadData();
  }

  private initLanguage() {
    this.translateService.get(['MESSAGE.LOADING', 'LABEL.ORDER']).subscribe(val => {
      this.loadingTxt = val['MESSAGE.LOADING'];
      this.orderTxt = val['LABEL.ORDER'];
    });
  }

  private initSetting(): void {
    this.settingProvider.getSetting().subscribe(setting => {
      this.lang = setting[Setting.LANGUAGE];
      this.currency = setting[Setting.CURRENCY] + ' ';
      this.symbol = setting[Setting.CURRENCY_SYMBOL];
    });
  }

  private initPage(): void {
    this.page = new Page();
    this.page.sort.column = 'createdDate';
    this.page.sort.isAsc = false;
  }

  private loadData() {
    this.startLoading();
    this.orderProvider.findByDate(new Date(), this.page).subscribe(page => {
      this.page.pageNumber = page.pageNumber;
      this.page.totalData = page.totalData;
      this.page.data = page.data;
      this.loading.dismiss();
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
    this.commonProvider.goToPage('OrderHistoryPage', {});
  }

  getProducts(order: Order): string {
    return this.commonProvider.getProductFromOrder(order);
  }

  previous(): void {
    if (this.page.pageNumber > 1) {
      this.page.pageNumber = this.page.pageNumber - 1
      this.loadData();
    }
  }

  next(): void {
    if (this.page.pageNumber < this.page.getTotalPage()) {
      this.page.pageNumber = this.page.pageNumber + 1
      this.loadData();
    }
  }

}
