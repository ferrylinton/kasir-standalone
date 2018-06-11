import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, LoadingController, Loading } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from "rxjs/observable/forkJoin";

import { CartProvider } from '../../providers/cart/cart';
import { CommonProvider } from '../../providers/common/common';
import { CategoryProvider } from '../../providers/category/category';
import { OrderProvider } from '../../providers/order/order';
import { SettingProvider } from '../../providers/setting/setting';
import { BaseCart } from '../base/base-cart';
import { DEFAULT_LANGUAGE } from '../../constant/setting';
import { Page } from '../../models/page.model';
import { Category } from '../../models/category.model';
import { Order } from '../../models/order.model';
import { Cart } from '../../models/cart.model';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage extends BaseCart{

  categories: Array<Category>;

  orders: Array<Order>;

  cart: Cart;

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

      super(modalCtrl, loadingCtrl, translateService, commonProvider, settingProvider);
      this.initLanguage();
      this.initSetting();
      this.initPage();
  }

  initPage(){
    this.page = new Page();
    this.page.sort.column = 'createdDate';
    this.page.sort.isAsc = false;
  }

  ionViewWillEnter() {
    this.startLoading();
    forkJoin([this.categoryProvider.findAll(), this.cartProvider.getCart(null), this.orderProvider.find(this.page)]).subscribe(results => {
        this.categories = results[0];
        this.cart = results[1];
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

  viewProduct(index: number, category: string) {
    index = index + 1;
    this.commonProvider.goToPage('ProductListPage', { index: index, category: category });
  }

}
