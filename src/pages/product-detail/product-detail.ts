import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { SettingProvider } from '../../providers/setting/setting';
import { MessageProvider } from '../../providers/message/message';
import { ProductProvider } from '../../providers/product/product';
import { BasePage } from '../base/base';
import { Product } from '../../models/product.model';


@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage extends BasePage {

  private RELOAD_PAGE: string = 'ProductPage';

  private FORM_PAGE: string = 'ProductFormPage';

  private DATA: string = 'product';

  private product: Product;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public events: Events,
    public translateService: TranslateService,
    public settingProvider: SettingProvider,
    public messageProvider: MessageProvider,
    public productProvider: ProductProvider) {

    super(storage, events, translateService, settingProvider, messageProvider);
    this.init();
  }

  private init(): void {
    this.product = this.navParams.get(this.DATA);

    if (this.product === undefined) {
      this.reloadPage(this.RELOAD_PAGE);
    }
  }

  modify() {
    this.navCtrl.push(this.FORM_PAGE, { product: this.product });
  }

  deleteCallback(product: Product): void {
    this.productProvider.delete(product.id).subscribe(result => {
      this.navCtrl.popToRoot();
      this.messageProvider.showDeleteToast(result.name);
    });
  }

  delete() {
    this.messageProvider.showDeleteConfirm(this.product.name, (product) => this.deleteCallback(this.product));
  }

}
