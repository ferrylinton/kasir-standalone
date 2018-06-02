import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { BaseCart } from '../base/base-cart';

import { UtilProvider } from '../../providers/util/util';
import { CategoryProvider } from '../../providers/category/category';
import { OrderProvider } from '../../providers/order/order';

import { Page } from '../../models/page.model';
import { Category } from '../../models/category.model';
import { Order } from '../../models/order.model';
import { PAGE } from '../../constant/constant';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage extends BaseCart {

  categories: Array<Category>;

  orders: Array<Order>;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public storage: Storage,
    public events: Events,
    public util: UtilProvider,
    public categoryProvider: CategoryProvider,
    public orderProvider: OrderProvider) {

    super(storage, util);
    this.init();
  }

  ionViewWillEnter() {
    this.init();
    this.getCurrentTotalItems();
  }

  private init(): void {
    this.loadData();
  }

  private loadData() {
    this.loadCategories();
    this.loadLatestOrders();
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

  viewOrder(){

  }
  
  refresh(){
    this.events.publish(PAGE, { page: 'HomePage', params: {} });
  }

  showOrder(order: Order) {
    let orderModal = this.modalCtrl.create('OrderModalPage', { order: order });
    orderModal.onDidDismiss(order => {
      if (order) {
        console.log('showOrder');
      }
    })
    orderModal.present();
  }

  viewProduct(index: number) {
    index = index + 1;
    this.events.publish(PAGE, { page: 'ProductListPage', params: { index: index } });
  }
}
