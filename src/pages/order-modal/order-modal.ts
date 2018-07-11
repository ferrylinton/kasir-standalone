import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { CartProvider } from '../../providers/cart/cart';
import { SettingProvider } from '../../providers/setting/setting';
import { UserProvider } from '../../providers/user/user';

import { Order } from '../../models/order.model';
import { Setting } from '../../models/setting.model';




@IonicPage()
@Component({
  selector: 'page-order-modal',
  templateUrl: 'order-modal.html',
})
export class OrderModalPage {

  setting: Setting;

  order: Order;

  totalItem: number;

  totalPrice: number;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public translateService: TranslateService,
    public settingProvider: SettingProvider,
    public userProvider: UserProvider,
    public cartProvider: CartProvider) {

    this.initSystem();
    this.order = navParams.get('order');
    forkJoin([this.userProvider.findById(this.order.createdBy),
      this.userProvider.findById(this.order.lastModifiedBy)]).subscribe(results => {
        this.order.createdBy = results[0];
        this.order.lastModifiedBy = results[1];
      });

    this.totalItem = (this.order == null) ? 0 : this.cartProvider.countItem(this.order);
    this.totalPrice = (this.order == null) ? 0 : this.cartProvider.countPrice(this.order);
  }

  private initSystem(): void {
    this.settingProvider.getSetting().subscribe(setting => {
      this.setting = setting;
    });
  }

}
