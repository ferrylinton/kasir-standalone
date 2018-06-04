import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { CartProvider } from '../../providers/cart/cart';

import { Order } from '../../models/order.model';
import { SettingProvider } from '../../providers/setting/setting';
import { DEFAULT_CURRENCY, DEFAULT_DATETIME_FORMAT, DEFAULT_LANGUAGE, DEFAULT_CURRENCY_SYMBOL } from '../../constant/setting';
import { TranslateService } from '@ngx-translate/core';



@IonicPage()
@Component({
  selector: 'page-order-modal',
  templateUrl: 'order-modal.html',
})
export class OrderModalPage {

  currency: string = DEFAULT_CURRENCY + '. ';

  currencySymbol: string = DEFAULT_CURRENCY_SYMBOL;

  datetimeFormat: string = DEFAULT_DATETIME_FORMAT;

  order: Order;

  totalItem: number;

  totalPrice: number;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public translateService: TranslateService,
    public settingProvider: SettingProvider,
    public cartProvider: CartProvider) {

    this.initSystem();
    this.order = navParams.get('order');
    this.totalItem = (this.order == null) ? 0 : this.cartProvider.countItem(this.order);
    this.totalPrice = (this.order == null) ? 0 : this.cartProvider.countPrice(this.order);
  }

  private initSystem(): void {
    this.settingProvider.getCurrency().subscribe(currency => {
      this.currency = currency + '. ';
    });

    this.settingProvider.getDateFormat().subscribe(datetimeFormat => {
      this.datetimeFormat = datetimeFormat;
    });

    this.settingProvider.getCurrencySymbol().subscribe(currencySymbol => {
      this.currencySymbol = currencySymbol;
    });
  }

}
