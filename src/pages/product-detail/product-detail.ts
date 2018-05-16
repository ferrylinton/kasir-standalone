import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { ProductProvider } from '../../providers/product/product';
import { BasePage } from '../base/base';
import { Product } from '../../models/product.model';


@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage extends BasePage {

  private product: Product;

  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public translate: TranslateService,
    public storage: Storage,
    public events: Events,
    public navCtrl: NavController,
    public navParams: NavParams,
    public productProvider: ProductProvider) {

    super(toastCtrl, alertCtrl, translate, storage, events);
    this.init(navParams);
  }

  private init(navParams: NavParams): void {
    this.product = navParams.get('product');

    if (this.product === undefined) {
      this.reloadPage('ProductPage');
    }
  }

  edit() {
    this.navCtrl.push('ProductEditPage', {
      product: this.product
    });
  }

  deleteCallback(product: Product): void {
    this.productProvider.delete(product.id).subscribe(result => {
      this.navCtrl.popToRoot();
      this.showDeleteToast(result.name);
    });
  }

  delete() {
    this.showDeleteConfirm(this.product.name, (product) => this.deleteCallback(this.product));
  }

}
