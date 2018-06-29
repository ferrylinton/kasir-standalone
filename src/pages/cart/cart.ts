import { Component } from '@angular/core';
import { IonicPage, NavParams, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { BaseCart } from '../base/base-cart';
import { CommonProvider } from '../../providers/common/common';
import { SettingProvider } from '../../providers/setting/setting';
import { MessageProvider } from '../../providers/message/message';
import { CartProvider } from '../../providers/cart/cart';
import { OrderProvider } from '../../providers/order/order';
import { Order } from "../../models/order.model";
import { Page } from '../../models/page.model';


@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage extends BaseCart {

  page: Page<Order>;

  segment = 'CartPage';

  constructor(
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public translateService: TranslateService,
    public messageProvider: MessageProvider,
    public settingProvider: SettingProvider,
    public commonProvider: CommonProvider,
    public orderProvider: OrderProvider,
    public cartProvider: CartProvider) {

    super(modalCtrl, translateService, commonProvider, settingProvider, cartProvider);
    this.initPage();
  }

  private initPage(): void {
    this.page = new Page();
    this.page.size = 5;
    this.page.sort.column = 'createdDate';
    this.page.sort.isAsc = false;
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter..........');
    console.log(this.currency);
    console.log(this.symbol);
    console.log(this.lang);
    this.loadOrder();
  }

  private loadOrder() {
    if (this.navParams.get('order')) {
      this.cartProvider.setCart(JSON.parse(this.navParams.get('order'))).subscribe(cart => {
        this.cart = cart;
      });
    } else {
      this.cartProvider.getCart().subscribe(cart => {
        this.cart = cart;
      });
    }
  }


  /**
   * Get Order from Order history and
   * set order to current cart if there is no item
   * 
   * @param order 
   */
  showOrder(order: Order) {
    const orderModal = this.modalCtrl.create('OrderModalPage', { order: order });
    orderModal.onDidDismiss(order => {
      if (order) {
        if (this.cartProvider.countItem(this.cart.order) > 0) {
          this.messageProvider.showToast(this.unsaveOrderTxt);
        } else {
          this.cartProvider.setCartFromOrder(order).subscribe(cart => {
            this.cart = cart;
          });
        }
      }
    })
    orderModal.present();
  }

  getProducts(order: Order): string {
    return this.commonProvider.getProductFromOrder(order);
  }

  pay() {
    const orderModal = this.modalCtrl.create('PaymentPage', { order: this.cart.order });
    orderModal.onDidDismiss(order => {
      if (order) {
        this.commonProvider.getLoggedUser().subscribe(user => {
          this.saveOrPay(true);
        });
      }
    });
    orderModal.present();
  }

  save(): void{
    this.messageProvider.showAddConfirm(this.orderTxt, () => this.saveCallback());
  }

  delete(): void{
    this.messageProvider.showDeleteConfirm(this.orderTxt, () => this.deleteOrderFromStorage());
  }

  private saveCallback() {
    this.commonProvider.getLoggedUser().subscribe(user => {
      this.saveOrPay(false);
    });
  }

  private saveOrPay(isPaid: boolean): void {
    this.commonProvider.getLoggedUser().subscribe(user => {
      if (this.cart.isModified) {
        this.cart.order.isPaid = this.cart.order.isPaid || isPaid;
        this.cart.order.lastModifiedBy = user.username;
        this.cart.order.lastModifiedDate = new Date();
        this.cart.order.createdDate = new Date(this.cart.order.createdDate);
        this.orderProvider.update(this.cart.order).subscribe(() => {
          this.deleteOrderFromStorage();
        });
      } else {
        this.cart.order.isPaid = isPaid;
        this.cart.order.createdBy = user.username;
        this.cart.order.createdDate = new Date();
        this.orderProvider.save(this.cart.order).subscribe(() => {
          this.deleteOrderFromStorage();
        });
      }
    });
  }

  private deleteOrderFromStorage(): void {
    this.initPage();
    this.cart = this.cartProvider.createNewCart();
    this.cartProvider.setCart(this.cart);
  }

  // Segment
  
  updateContent(): void {
    this.commonProvider.goToPage(this.segment, {});
  }

}
