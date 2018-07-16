import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
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
    public modalCtrl: ModalController,
    public cartProvider: CartProvider,
    public events: Events,
    public translateService: TranslateService,
    public productProvider: ProductProvider) {

    super(modalCtrl, cartProvider);
  }

  ionViewWillEnter() {
    this.error = null;
    this.cartProvider.getCart().subscribe(cart => {
      this.cart = cart;
    }, error => {
      this.error = 'Error : ' + error;
    });
  }

  private initPage(): void {
    this.page = new Page();
  }

  search() {
    if (this.keyword && this.keyword.trim() != '') {
      this.initPage();
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
    this.error = null;
    this.productProvider.findByName(this.keyword, this.page).subscribe(page => {
      this.page.pageNumber = page.pageNumber;
      this.page.totalData = page.totalData;
      this.page.data = [...this.page.data, ...page.data];
    }, error => {
      this.error = 'Error : ' + error;
    })
  }

  updateContent(): void {
    this.events.publish(PAGE, { page: this.segment, params: {} });
  }

}
