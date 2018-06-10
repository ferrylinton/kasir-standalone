import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides, PopoverController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from "rxjs/observable/forkJoin";

import * as Setting from '../../constant/setting';
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
import { Cart } from '../../models/cart.model';



@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {

  @ViewChild(Slides) slides: Slides;

  @ViewChild('searchbar') searchbar: any;

  private LABEL_GRID = 'LABEL.GRID';

  private LABEL_LIST = 'LABEL.LIST';

  private LABEL_ALL_CATEGORIES = 'LABEL.ALL_CATEGORIES';

  private MESSAGE_LOADING = 'MESSAGE.LOADING';

  private gridTxt: string = 'Grid';

  private listTxt: string = 'List';

  private allCategoriesTxt: string = 'All Categories';

  private loadingTxt: string = 'Please wait...';

  private loading: Loading;

  lang: string = Setting.DEFAULT_LANGUAGE;

  currency: string = Setting.DEFAULT_CURRENCY + ' ';

  symbol: string = Setting.DEFAULT_CURRENCY_SYMBOL;

  cart: Cart;

  index: number = 0;

  showSearch: boolean = false;

  showGrid: boolean = true;

  category: string = '';

  keyword: string = '';

  categories: Array<Category>;

  showLeftButton: boolean;

  showRightButton: boolean;

  page: Page<Product>;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public cartProvider: CartProvider,
    public commonProvider: CommonProvider,
    public settingProvider: SettingProvider,
    public popoverCtrl: PopoverController,
    public translate: TranslateService,
    public productProvider: ProductProvider,
    public categoryProvider: CategoryProvider) {

    this.initLanguage();
    this.initSetting();
    this.initPage();
  }

  private initLanguage(): void {
    this.translate.get([this.LABEL_GRID, this.LABEL_LIST,
    this.LABEL_ALL_CATEGORIES, this.MESSAGE_LOADING]).subscribe(values => {

      this.gridTxt = values[this.LABEL_GRID];
      this.listTxt = values[this.LABEL_LIST];
      this.allCategoriesTxt = values[this.LABEL_ALL_CATEGORIES];
      this.loadingTxt = values[this.MESSAGE_LOADING];
    });
  }

  private initSetting(): void {
    this.settingProvider.getSetting().subscribe(setting => {
      this.lang = setting[Setting.LANGUAGE];
      this.currency = setting[Setting.CURRENCY] + ' ';
      this.symbol = setting[Setting.CURRENCY_SYMBOL];
    });
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

  // Loading

  private startLoading(): void {
    this.loading = this.loadingCtrl.create({
      content: this.loadingTxt
    });

    this.loading.present();
  }

  private stopLoading() {
    this.loading.dismiss();
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

  private search(keyword: string){
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

  refresh() {
    this.commonProvider.goToPage('ProductListPage', {});
  }

  view(product: Product) {
    this.navCtrl.push('ProductDetailPage', {
      product: product
    });
  }

  // More Menu

  showMore(event: Event) {
    let menus = new Array<MoreMenu>();
    menus.push(new MoreMenu('apps', this.gridTxt, 'grid'));
    menus.push(new MoreMenu('menu', this.listTxt, 'list'));

    let moreMenuPage = this.popoverCtrl.create(MoreMenuPage, { menus: menus });
    moreMenuPage.onDidDismiss(val => {
      if (val === 'grid') {
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
      this.stopLoading();
    })
  }

  addItem(product: Product): void {
    this.cartProvider.addItem(product).subscribe(order => {
      this.cartProvider.getCart(order).subscribe(cart => {
        this.cart = cart;
      })
    })
  }

  removeItem(product: Product): void {
    this.cartProvider.removeItem(product).subscribe(order => {
      this.cartProvider.getCart(order).subscribe(cart => {
        this.cart = cart;
      })
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

}

