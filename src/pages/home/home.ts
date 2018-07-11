import { Component, ViewChild } from '@angular/core';
import { IonicPage, Slides, NavParams, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from "rxjs/observable/forkJoin";
import { Events } from 'ionic-angular';

import { BaseCartPage } from '../base/base-cart';
import { CategoryProvider } from '../../providers/category/category';
import { ProductProvider } from '../../providers/product/product';
import { CartProvider } from '../../providers/cart/cart';
import { SettingProvider } from '../../providers/setting/setting';
import { Page } from '../../models/page.model';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';
import { PAGE } from '../../constant/constant';
import { MessageProvider } from '../../providers/message/message';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage extends BaseCartPage {

  @ViewChild(Slides) slides: Slides;

  segment = 'HomePage';

  category: Category = new Category('', this.allCategoriesTxt);

  categories: Array<Category>;

  showLeftButton: boolean;

  showRightButton: boolean;

  page: Page<Product>;

  constructor(
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public cartProvider: CartProvider,
    public events: Events,
    public settingProvider: SettingProvider,
    public translateService: TranslateService,
    public messageProvider: MessageProvider,
    public productProvider: ProductProvider,
    public categoryProvider: CategoryProvider) {

    super(modalCtrl, translateService, events, settingProvider, cartProvider);
    this.initPage();
  }

  private initPage(): void {
    this.page = new Page();
  }

  ionViewWillEnter() {
    forkJoin([this.categoryProvider.findAll(), this.cartProvider.getCart()]).subscribe(results => {
      this.categories = results[0];
      this.categories.unshift(new Category('', this.allCategoriesTxt));
      this.cart = results[1];
      this.loadProducts();
      this.slides.slideTo(this.slides.getActiveIndex(), 0, false);
      this.setSlideProperties();
    }, error => {
      this.messageProvider.toast('Error : ' + error);
    });
  }

  // Slides

  slideChanged(): void {
    this.setSlideProperties();
    this.initPage();
    this.loadProducts();
  }

  slideNext(): void {
    this.slides.slideNext();
  }

  slidePrev(): void {
    this.slides.slidePrev();
  }

  private setSlideProperties() {
    this.showLeftButton = this.slides.getActiveIndex() !== 0;
    this.showRightButton = this.slides.getActiveIndex() !== this.categories.length - 1;
    this.category = this.categories[this.slides.getActiveIndex()];
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
    this.productProvider.findByCategory(this.category.id, this.page).subscribe(page => {
      this.page.pageNumber = page.pageNumber;
      this.page.totalData = page.totalData;
      this.page.data = [...this.page.data, ...page.data];
    }, error => {
      this.messageProvider.toast('Error : ' + error);
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

  updateContent(): void {
    this.events.publish(PAGE, { page: this.segment, params: {} });
  }

}

