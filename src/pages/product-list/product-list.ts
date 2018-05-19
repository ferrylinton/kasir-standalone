import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { BaseCart } from '../base/base-cart';
import { ProductProvider } from '../../providers/product/product';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';
import { Product } from '../../models/product.model';



@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage extends BaseCart {

  page: Page<Product>;

  constructor(
    public navCtrl: NavController,
    public productProvider: ProductProvider,
    public storage: Storage) {

    super(storage);
    this.init();
  }

  ionViewWillEnter() {
    this.init();
  }

  private init(): void {
    this.totalItems = this.getTotalItems();
    this.page = new Page(new Array<Product>(), 1, 0);
    this.loadData(this.page);
  }

  private loadData(pageable: Pageable) {
    this.productProvider.find(pageable).subscribe(page => {

      this.page.pageNumber = page.pageNumber;
      this.page.totalData = page.totalData;

      for (let i = 0; i < page.data.length; i++) {
        this.page.data.push(page.data[i]);
      }
    })
  }

  view(product: Product) {
    this.navCtrl.push('ProductDetailPage', {
      product: product
    });
  }

  doInfinite(infiniteScroll) {
    this.page.pageNumber = this.page.pageNumber + 1;
    this.loadData(this.page);
    infiniteScroll.complete();
  }

}
