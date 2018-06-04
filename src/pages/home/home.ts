import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, LoadingController } from 'ionic-angular';
import { forkJoin } from "rxjs/observable/forkJoin";

import { CartProvider } from '../../providers/cart/cart';
import { CommonProvider } from '../../providers/common/common';
import { CategoryProvider } from '../../providers/category/category';
import { OrderProvider } from '../../providers/order/order';

import { Page } from '../../models/page.model';
import { Category } from '../../models/category.model';
import { Order } from '../../models/order.model';
import { TranslateService } from '@ngx-translate/core';


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

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public translateService: TranslateService,
    public categoryProvider: CategoryProvider,
    public orderProvider: OrderProvider,
    public cartProvider: CartProvider,
    public commonProvider: CommonProvider) {

      translateService.get('MESSAGE.LOADING').subscribe(val => {
        this.loadingTxt = val;
      });
  }

  ionViewWillEnter() {
    const loading = this.loadingCtrl.create({
      content: this.loadingTxt
    });
    loading.present();

    let page = new Page();
    page.sort.column = 'createdDate';
    page.sort.isAsc = false;

    forkJoin([this.categoryProvider.findAll(), this.cartProvider.getTotalItem(), this.orderProvider.find(page)]).subscribe(results => {
        this.categories = results[0];
        this.totalItem = results[1];
        this.orders = results[2].data;
        loading.dismiss();
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
}
