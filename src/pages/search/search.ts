import { Component } from '@angular/core';
import { IonicPage, ModalController, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Events } from 'ionic-angular';

import { BaseCartPage } from '../base/base-cart';
import { ProductProvider } from '../../providers/product/product';
import { CartProvider } from '../../providers/cart/cart';
import { Page } from '../../models/page.model';
import { Product } from '../../models/product.model';
import { PAGE } from '../../constant/constant';


@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage extends BaseCartPage {

  segment = 'SearchPage';

  keyword: string = '';

  page: Page<Product>;

  constructor(
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public cartProvider: CartProvider,
    public events: Events,
    public translate: TranslateService,
    public productProvider: ProductProvider) {

    super(loadingCtrl, modalCtrl, translate, cartProvider);
  }

  ionViewWillEnter() {
    this.message = null;
    this.cartProvider.getCart().subscribe(cart => {
      this.cart = cart;
    }, error => {
      this.message = 'Error : ' + error;
    });
  }

  search() {
    if (this.keyword && this.keyword.trim() != '') {
      this.page = new Page();
      this.loadProducts()
    }
  }

  clear() {
    this.page = null;
  }

  doInfinite(infiniteScroll) {
    this.page.pageNumber = this.page.pageNumber + 1;
    this.loadProducts();
    infiniteScroll.complete();
  }

  view(product: Product) {
    const productModal = this.modalCtrl.create('ProductModalPage', { product: product });
    productModal.present();
  }

  private loadProducts() {
    this.startLoading();
    this.message = null;
    this.productProvider.findByName(this.keyword, this.page).subscribe(page => {
      this.setPage(page);
    }, (error) => {
      this.message = 'Error : ' + error;
    }, () => {
      this.stopLoading();
    });
  }

  updateContent(): void {
    this.events.publish(PAGE, { page: this.segment, params: {} });
  }

}
