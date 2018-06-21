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

  segment = 'OrderHistoryPage';

  loading: Loading;

  order: Order;

  page: Page<Order>;

  monthNames: any = {};

  orderDate: string = new Date().toISOString();

  min: string;

  max: string;

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
    this.initDatePicker();
  }

  ionViewWillEnter() {
    this.initPage();
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

  private initDatePicker(): void{
    let today : Date = new Date();
    today.setMonth(today.getMonth() - 12);
    this.min = today.toJSON().split('T')[0];
    this.max = new Date().toJSON().split('T')[0];
    this.monthNames['id'] = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    this.monthNames['en'] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }

  private initPage(): void {
    this.page = new Page();
    this.page.sort.column = 'createdDate';
    this.page.sort.isAsc = false;
  }

  private loadData() {
    this.startLoading();
    this.orderProvider.findByDate(new Date(this.orderDate), this.page).subscribe(page => {
      this.page.pageNumber = page.pageNumber;
      this.page.totalData = page.totalData;
      this.page.data = [...this.page.data, ...page.data];
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

  // Infinite Scroll

  doInfinite(infiniteScroll) {
    this.page.pageNumber = this.page.pageNumber + 1;
    this.loadData();
    infiniteScroll.complete();
  }

  search(){
    console.log('orderDate : ' + this.orderDate);
    this.initPage();
    this.loadData();
  }

  // Segment
  
  updateContent(): void {
    if (this.segment !== 'OrderHistoryPage') {
      this.commonProvider.goToPage(this.segment, {});
    }
  }

}
