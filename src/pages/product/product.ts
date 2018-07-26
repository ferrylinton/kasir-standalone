import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { BaseListPage } from '../base/base-list';
import { ProductProvider } from '../../providers/product/product';
import { Product } from '../../models/product.model';

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage extends BaseListPage<Product>{

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public translate: TranslateService,
    public productProvider: ProductProvider
  ) {
    super(loadingCtrl, translate);
  }

  ionViewWillEnter() {
    this.initPage();
    this.loadData();
  }

  loadData() {
    this.productProvider.findByName(this.keyword, this.page).subscribe(page => {
      this.setPage(page);
    }, (error) => {
      this.message = 'Error : ' + error;
    });
  }

  view(product: Product) {
    this.navCtrl.push('ProductDetailPage', { product: product });
  }

  create() {
    this.navCtrl.push('ProductFormPage', { product: new Product() });
  }

}
