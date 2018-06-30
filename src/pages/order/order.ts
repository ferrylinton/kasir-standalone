import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { CommonProvider } from '../../providers/common/common';
import { SettingProvider } from '../../providers/setting/setting';
import { MessageProvider } from '../../providers/message/message';
import { CartProvider } from '../../providers/cart/cart';
import { OrderProvider } from '../../providers/order/order';
import { Order } from "../../models/order.model";
import { Page } from '../../models/page.model';
import { BaseCartPage } from '../base/base-cart';


@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage extends BaseCartPage {

  segment = 'OrderPage';

  order: Order;

  page: Page<Order>;

  monthNames: any = {};

  orderDate: string = new Date().toISOString();

  min: string;

  max: string;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public translateService: TranslateService,
    public messageProvider: MessageProvider,
    public settingProvider: SettingProvider,
    public commonProvider: CommonProvider,
    public orderProvider: OrderProvider,
    public cartProvider: CartProvider) {

    super(modalCtrl, translateService, commonProvider, settingProvider, cartProvider);
    this.initDatePicker();
  }

  ionViewWillEnter() {
    this.cartProvider.getCart().subscribe(cart => {
      this.cart = cart;
    })
    this.initPage();
    this.loadData();
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
    this.orderProvider.findByDate(new Date(this.orderDate), this.page).subscribe(page => {
      this.page.pageNumber = page.pageNumber;
      this.page.totalData = page.totalData;
      this.page.data = [...this.page.data, ...page.data];
    })
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

  getProducts(order: Order): string {
    return this.commonProvider.getProductFromOrder(order);
  }

  getIcon(order: Order): string{
    if(order.isCanceled){
      return 'remove-circle';
    }else if(order.isPaid){
      return 'cash';
    }

    return 'checkmark-circle';
  }

  getIconColor(order: Order): string{
    if(order.isCanceled){
      return 'danger';
    }else if(order.isPaid){
      return 'secondary';
    }

    return 'primary';
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
    this.commonProvider.goToPage(this.segment, {});
  }

}
