import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, LoadingController, Loading } from 'ionic-angular';
import { forkJoin } from "rxjs/observable/forkJoin";

import { CartProvider } from '../../providers/cart/cart';
import { CommonProvider } from '../../providers/common/common';
import { CategoryProvider } from '../../providers/category/category';
import { OrderProvider } from '../../providers/order/order';

import { Page } from '../../models/page.model';
import { Category } from '../../models/category.model';
import { Order } from '../../models/order.model';
import { TranslateService } from '@ngx-translate/core';
import { SettingProvider } from '../../providers/setting/setting';
import { DEFAULT_LANGUAGE } from '../../constant/setting';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  private loadingTxt: string = 'Please wait...';

  categories: Array<Category>;

  orders: Array<Order>;

  totalItem: number = 0;

  lang: string = DEFAULT_LANGUAGE;

  loading: Loading;

  page: Page<Order>;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public translateService: TranslateService,
    public settingProvider: SettingProvider,
    public categoryProvider: CategoryProvider,
    public orderProvider: OrderProvider,
    public cartProvider: CartProvider,
    public commonProvider: CommonProvider) {

      this.initLanguage();
      this.initSetting();
      this.initPage();
  }

  initLanguage(){
    this.translateService.get('MESSAGE.LOADING').subscribe(val => {
      this.loadingTxt = val;
    });
  }

  initSetting(){
    this.settingProvider.getLanguage().subscribe(lang => {
      this.lang = lang;
    });
  }

  initPage(){
    this.page = new Page();
    this.page.sort.column = 'createdDate';
    this.page.sort.isAsc = false;
  }

  ionViewWillEnter() {
    this.startLoading();
    forkJoin([this.categoryProvider.findAll(), this.cartProvider.getTotalItem(), this.orderProvider.find(this.page)]).subscribe(results => {
        this.categories = results[0];
        this.totalItem = results[1];
        this.orders = results[2].data;
        this.loading.dismiss();
      });
  }

  viewOrder() {
    this.commonProvider.goToPage('OrderPage', {});
  }

  refresh() {
    this.commonProvider.goToPage('HomePage', {});
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

  viewProduct(index: number) {
    index = index + 1;
    this.commonProvider.goToPage('ProductListPage', { index: index });
  }

  getProducts(order: Order): string {
    return this.commonProvider.getProductFromOrder(order);
  }

  private startLoading(): void {
    this.loading = this.loadingCtrl.create({
      content: this.loadingTxt
    });
    this.loading.present();
  }

}
