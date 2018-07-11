import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { BaseListPage } from '../base/base-list';
import { ProductProvider } from '../../providers/product/product';
import { Product } from '../../models/product.model';

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage extends BaseListPage<Product>{

  constructor(public navCtrl: NavController, public productProvider: ProductProvider) {
    super('name');
  }

  ionViewWillEnter() {
    this.initPage();
    this.loadData();
  }

  loadData() {
    this.productProvider.findByName(this.keyword, this.page).subscribe(page => {
      this.page.pageNumber = page.pageNumber;
      this.page.totalData = page.totalData;
      this.page.data = [...this.page.data, ...page.data];
    })
  }

  view(product: Product) {
    this.navCtrl.push('ProductDetailPage', { product: product });
  }

  create() {
    this.navCtrl.push('ProductFormPage', { product: new Product('') });
  }

}
