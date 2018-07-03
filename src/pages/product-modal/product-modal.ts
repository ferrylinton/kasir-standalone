import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { SettingProvider } from '../../providers/setting/setting';
import { TranslateService } from '@ngx-translate/core';

import { Product } from '../../models/product.model';
import { Setting } from '../../models/setting.model';

@IonicPage()
@Component({
  selector: 'page-product-modal',
  templateUrl: 'product-modal.html',
})
export class ProductModalPage {

  setting: Setting;

  product: Product;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public translateService: TranslateService,
    public settingProvider: SettingProvider) {

    this.initSystem();
    this.product = navParams.get('product');
  }

  private initSystem(): void {
    this.settingProvider.getSetting().subscribe(setting => {
      this.setting = setting;
    });
  }

}
