import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';

import { CartProvider } from '../../providers/cart/cart';
import { CommonProvider } from '../../providers/common/common';
import { CategoryProvider } from '../../providers/category/category';
import { OrderProvider } from '../../providers/order/order';

import { Page } from '../../models/page.model';
import { Category } from '../../models/category.model';
import { Order } from '../../models/order.model';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  categories: Array<Category>;

  orders: Array<Order>;

  totalItems: number = 0;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public categoryProvider: CategoryProvider,
    public orderProvider: OrderProvider,
    public cartProvider: CartProvider,
    public commonProvider: CommonProvider) {

  }

  ionViewWillEnter() {
    this.loadCategories();
    this.loadLatestOrders();
    this.getTotalItems();
  }

  private getTotalItems() {
    this.cartProvider.getTotalItems().subscribe(totalItems => {
      this.totalItems = totalItems;
    });
  }

  private loadCategories() {
    this.categoryProvider.findAll().subscribe(categories => {
      this.categories = categories;
    })
  }

  private loadLatestOrders() {
    let page = new Page();
    page.sort.column = 'createdDate';
    page.sort.isAsc = false;

    this.orderProvider.find(page).subscribe(page => {
      this.orders = page.data;
    })
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
        console.log('showOrder');
      }
    })
    orderModal.present();
  }

  viewProduct(index: number) {
    index = index + 1;
    this.commonProvider.goToPage('ProductListPage', { index: index });
  }
}
