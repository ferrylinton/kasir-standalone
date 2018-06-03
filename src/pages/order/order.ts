import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CartProvider } from '../../providers/cart/cart';
import { OrderProvider } from '../../providers/order/order';
import { Order } from "../../models/order.model";
import { Page } from '../../models/page.model';


@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage{

  order: Order;

  page: Page<Order>;

  totalItem: number = 0;

  totalPrice: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public orderProvider: OrderProvider,
    public cartProvider: CartProvider) {

      if(navParams.get('order')){
        this.cartProvider.setOrder(navParams.get('order'));
      }
  }

  ionViewDidLoad() {
    this.initCurrentOrder();
    this.initPage();
    this.loadOrderHistory();
  }

  viewOrder() {
    this.navCtrl.push('OrderPage');
  }

  private initCurrentOrder() {
    this.cartProvider.getTotalItem().subscribe(totalItem => {
      this.totalItem = totalItem;
    });

    this.cartProvider.getTotalPrice().subscribe(totalPrice => {
      this.totalPrice = totalPrice;
    });
    
    this.cartProvider.getOrder().subscribe(order => {
      this.order = order;
    })
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
      this.page.data = [...this.page.data, ...page.data];
    })
  }

}
