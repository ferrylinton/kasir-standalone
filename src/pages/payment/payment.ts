import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { CartProvider } from '../../providers/cart/cart';

import { Order } from '../../models/order.model';
import { SettingProvider } from '../../providers/setting/setting';
import * as Setting from '../../constant/setting';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  lang: string = Setting.DEFAULT_LANGUAGE;

  currency: string = Setting.DEFAULT_CURRENCY + ' ';

  symbol: string = Setting.DEFAULT_CURRENCY_SYMBOL;

  datetimeFormat: string = Setting.DEFAULT_DATETIME_FORMAT;

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
    this.settingProvider.getSetting().subscribe(setting => {
      this.lang = setting[Setting.LANGUAGE];
      this.currency = setting[Setting.CURRENCY] + ' ';
      this.symbol = setting[Setting.CURRENCY_SYMBOL];
      this.datetimeFormat = setting[Setting.DATETIME_FORMAT];
    });
  }
  
}
