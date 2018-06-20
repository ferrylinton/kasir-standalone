import { Component, ViewChild } from '@angular/core';
import { IonicPage, Slides, PopoverController, NavParams, LoadingController, ModalController, NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from "rxjs/observable/forkJoin";

import { BaseCart } from '../base/base-cart';
import { CategoryProvider } from '../../providers/category/category';
import { ProductProvider } from '../../providers/product/product';
import { CartProvider } from '../../providers/cart/cart';
import { CommonProvider } from '../../providers/common/common';
import { SettingProvider } from '../../providers/setting/setting';
import { Page } from '../../models/page.model';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage extends BaseCart {

  segment = 'SearchPage';

  keyword: string = '';

  page: Page<Product>;

  constructor(
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public cartProvider: CartProvider,
    public commonProvider: CommonProvider,
    public settingProvider: SettingProvider,
    public translateService: TranslateService,
    public productProvider: ProductProvider,
    public categoryProvider: CategoryProvider) {

    super(modalCtrl, popoverCtrl, loadingCtrl, translateService, commonProvider, settingProvider, cartProvider);
  }

  ionViewWillEnter() {
    this.cartProvider.getCart().subscribe(cart => {
      this.cart = cart;
    })
  }

  private initPage(): void {
    this.page = new Page();
    this.page.sort.column = 'name';
    this.page.sort.isAsc = true;
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

  // Infinite Scroll

  doInfinite(infiniteScroll) {
    this.page.pageNumber = this.page.pageNumber + 1;
    this.loadProducts();
    infiniteScroll.complete();
  }

  // Product

  view(product: Product) {
    const productModal = this.modalCtrl.create('ProductModalPage', { product: product });
    productModal.present();
  }

  private loadProducts() {
    this.productProvider.findByName(this.keyword, this.page).subscribe(page => {
      this.page.pageNumber = page.pageNumber;
      this.page.totalData = page.totalData;
      this.page.data = [...this.page.data, ...page.data];
    })
  }

  isSelected(product: Product): boolean {
    for (let i = 0; i < this.cart.order.items.length; i++) {
      if (this.cart.order.items[i].product.id === product.id) {
        return true;
      }
    }

    return false;
  }

  getQuantity(product: Product): number {
    for (let i = 0; i < this.cart.order.items.length; i++) {
      if (this.cart.order.items[i].product.id === product.id) {
        return this.cart.order.items[i].quantity;
      }
    }

    return 0;
  }

  // Segment
  
  updateContent(): void {
    if (this.segment !== 'SearchPage') {
      this.commonProvider.goToPage(this.segment, {});
    }
  }

}
