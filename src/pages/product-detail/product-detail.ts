import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { PAGE } from '../../constant/constant';
import { MessageProvider } from '../../providers/message/message';
import { UserProvider } from '../../providers/user/user';
import { ProductProvider } from '../../providers/product/product';
import { Product } from '../../models/product.model';


@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage{

  private product: Product;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public messageProvider: MessageProvider,
    public userProvider: UserProvider,
    public productProvider: ProductProvider) {
  }

  ionViewWillEnter() {
    this.init();
  }

  private init(): void {
    this.product = this.navParams.get('product');

    if (!this.product) {
      this.events.publish(PAGE, { page: 'ProductPage', params: {} });
    } else {
      forkJoin([this.userProvider.findById(this.product.createdBy),
      this.userProvider.findById(this.product.lastModifiedBy)]).subscribe(results => {
        this.product.createdBy = results[0];
        this.product.lastModifiedBy = results[1];
      });
    }
  }

  modify() {
    this.navCtrl.push('ProductFormPage', { product: this.product });
  }

  deleteCallback(): void {
    this.productProvider.delete(this.product.id).subscribe(result => {
      this.navCtrl.popToRoot();
      this.messageProvider.toastDelete();
    }, error => {
      this.messageProvider.toast('Error : ' + error);
    });
  }

  delete() {
    this.messageProvider.confirmDelete(() => this.deleteCallback());
  }

}
