import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { v4 as uuid } from 'uuid';

import { CategoryProvider } from '../../providers/category/category';
import { OrderProvider } from '../../providers/order/order';

import { Pageable } from '../../models/pageable.model';
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

  constructor(
    public navCtrl: NavController,
    public categoryProvider: CategoryProvider,
    public orderProvider: OrderProvider) {

    this.init();
  }

  ionViewWillEnter() {
    this.init();
  }

  private init(): void {
    this.loadData();
  }

  private loadData() {
    this.loadCategories();
    this.loadLatestOrders();
  }

  private loadCategories(){
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
  
}
