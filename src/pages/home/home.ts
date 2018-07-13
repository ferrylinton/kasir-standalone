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


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage extends BaseCartPage {

  @ViewChild(Slides) slides: Slides;

  segment = 'HomePage';

  category: Category = new Category('');

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
    public translate: TranslateService,
    public productProvider: ProductProvider,
    public categoryProvider: CategoryProvider) {

    super(settingProvider, cartProvider);
    this.initPage();
  }

  private initPage(): void {
    this.page = new Page();
  }

  ionViewWillEnter() {
    forkJoin([this.categoryProvider.findAll(), this.cartProvider.getCart()]).subscribe(results => {
      this.initCategories(results[0]);
      this.cart = results[1];
      this.loadProducts();
      this.slides.slideTo(this.slides.getActiveIndex(), 0, false);
      this.setSlideProperties();
    }, error => {
      this.error = 'Error : ' + error;
    });
  }

  private initCategories(categories: Array<Category>): void{
    this.translate.get('ALL_CATEGORIES').subscribe(value => {
      this.categories = categories;
      this.categories.unshift(new Category('', value));
    })
  }

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
    this.productProvider.findByCategory(this.category.id, this.page).subscribe(page => {
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

