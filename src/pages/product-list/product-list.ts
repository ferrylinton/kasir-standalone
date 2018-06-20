import { Component, ViewChild } from '@angular/core';
import { IonicPage, Slides, PopoverController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from "rxjs/observable/forkJoin";

import { BaseCart } from '../base/base-cart';
import { CategoryProvider } from '../../providers/category/category';
import { ProductProvider } from '../../providers/product/product';
import { CartProvider } from '../../providers/cart/cart';
import { CommonProvider } from '../../providers/common/common';
import { SettingProvider } from '../../providers/setting/setting';
import { MoreMenuPage } from '../more-menu/more-menu';
import { Page } from '../../models/page.model';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';
import { MoreMenu } from '../../models/more-menu.model';


@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage extends BaseCart {

  @ViewChild(Slides) slides: Slides;

  @ViewChild('searchbar') searchbar: any;

  index: number = 0;

  segment = 'product';

  showSearch: boolean = false;

  showGrid: boolean = true;

  category: string = '';

  keyword: string = '';

  categories: Array<Category>;

  showLeftButton: boolean;

  showRightButton: boolean;

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
    this.initPage();
  }

  private initPage(): void {
    this.page = new Page();
    this.page.sort.column = 'name';
    this.page.sort.isAsc = true;
  }

  private initIndex() {
    this.index = this.navParams.get('index') ? this.navParams.get('index') : 0;
    this.setSlideProperties();
  }

  ionViewWillEnter() {
    this.startLoading();
    forkJoin([this.categoryProvider.findAll(), this.cartProvider.getCart()]).subscribe(results => {
      this.categories = results[0];
      this.categories.unshift(new Category(this.category, this.allCategoriesTxt));
      this.cart = results[1];
      this.initIndex();
      this.loadProducts();
    });
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.slides.slideTo(this.index, 0, false);
      this.setSlideProperties();
    }, 100);
  }

  // Slides

  slideChanged(): void {
    this.startLoading();
    this.index = this.slides.getActiveIndex();
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
    this.showLeftButton = this.index !== 0;
    this.showRightButton = this.index !== this.categories.length - 1;
    this.category = this.index === 0 ? '' : this.categories[this.index].name;
  }

  // Search

  toggleSearch() {
    this.showSearch = this.showSearch ? false : true;
    if (this.showSearch) {
      setTimeout(() => {
        this.searchbar.setFocus();
      }, 100);
    }
  }

  clearSearch() {
    this.showSearch = false;
    this.search('');
  }

  triggerSearch(ev: any) {
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.search(val);
    }
  }

  private search(keyword: string) {
    this.category = '';
    this.keyword = keyword;
    this.initPage();
    this.initIndex();
    this.loadProducts()
  }

  // Infinite Scroll

  doInfinite(infiniteScroll) {
    this.page.pageNumber = this.page.pageNumber + 1;
    this.loadProducts();
    infiniteScroll.complete();
  }

  // Page

  viewOrder() {
    this.commonProvider.goToPage('OrderPage', {});
  }

  view(product: Product) {
    const productModal = this.modalCtrl.create('ProductModalPage', { product: product });
    productModal.present();
  }

  // More Menu

  showMore(event: Event) {
    let menus = new Array<MoreMenu>();
    menus.push(new MoreMenu(this.gridTxt, 'grid'));
    menus.push(new MoreMenu(this.listTxt, 'list'));

    let moreMenuPage = this.popoverCtrl.create(MoreMenuPage, { menus: menus });
    moreMenuPage.onDidDismiss(val => {
      if (val === 'reload') {
        this.commonProvider.goToPage('ProductListPage', {});
      } else if (val === 'grid') {
        this.showGrid = true;
      } else if (val === 'list') {
        this.showGrid = false;
      }
    });

    moreMenuPage.present({ ev: event });
  }

  // Product

  private loadProducts() {
    this.productProvider.findByCategoryAndName(this.category, this.keyword, this.page).subscribe(page => {
      this.page.pageNumber = page.pageNumber;
      this.page.totalData = page.totalData;
      this.page.data = [...this.page.data, ...page.data];
      this.loading.dismiss();
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

  update(): void{
    console.log('update : ' + this.segment);
  }

}

