import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides, PopoverController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from "rxjs/observable/forkJoin";

import { ProductProvider } from '../../providers/product/product';
import { Page } from '../../models/page.model';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';
import { CategoryProvider } from '../../providers/category/category';
import { MoreMenuPage } from '../more-menu/more-menu';
import { MoreMenu } from '../../models/more-menu.model';
import { CartProvider } from '../../providers/cart/cart';
import { CommonProvider } from '../../providers/common/common';
import { Order } from '../../models/order.model';
import { SettingProvider } from '../../providers/setting/setting';
import * as Setting from '../../constant/setting';
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
    this.initIndex();
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

  ionViewWillEnter() {
    this.startLoading();
    forkJoin([
      this.categoryProvider.findAll(),
      this.cartProvider.getCart(),
      this.productProvider.findByCategoryAndName(this.category, this.keyword, this.page)]).subscribe(results => {

        this.setCategories(results[0]);
        this.cart = results[1];
        this.page.pageNumber = results[2].pageNumber;
        this.page.totalData = results[2].totalData;
        this.page.data = results[2].data;
        this.stopLoading();
      });
  }

  ionViewDidEnter() {

    setTimeout(() => {
      this.slides.slideTo(this.index, 0, false);
      this.showLeftButton = this.index !== 0;
      this.showRightButton = this.index !== this.categories.length - 1;
    }, 100);

  }

  private initPage(): void {
    this.page = new Page();
    this.page.sort.column = 'name';
    this.page.sort.isAsc = true;
  }

  private initIndex() {
    if (this.navParams.get('index')) {
      this.index = this.navParams.get('index');
      this.category = this.navParams.get('category');
    } else {
      this.index = 0;
      this.category = '';
    }
  }

  private setCategories(categories: Array<Category>): void {
    categories.unshift(new Category(this.category, this.allCategoriesTxt));
    this.categories = categories;
    this.showLeftButton = false;
    this.showRightButton = this.categories.length > 1;
  }

  private loadProducts() {
    this.startLoading();
    this.productProvider.findByCategoryAndName(this.category, this.keyword, this.page).subscribe(page => {
      this.page.pageNumber = page.pageNumber;
      this.page.totalData = page.totalData;
      this.page.data = [...this.page.data, ...page.data];
      this.stopLoading();
    })
  }

  private startLoading(): void {
    this.loading = this.loadingCtrl.create({
      content: this.loadingTxt
    });

    this.loading.present();
  }

  public slideChanged(): void {
    let index = this.slides.getActiveIndex();
    this.showLeftButton = index !== 0;
    this.showRightButton = index !== this.categories.length - 1;
    this.category = index === 0 ? '' : this.categories[index].name;
    this.initPage();
    this.loadProducts();
  }

  public slideNext(): void {
    this.slides.slideNext();
  }

  public slidePrev(): void {
    this.slides.slidePrev();
  }

  toggleSearch() {
    this.showSearch = this.showSearch ? false : true;
    if (this.showSearch) {
      setTimeout(() => {
        this.searchbar.setFocus();
      }, 100);
    }
  }

  clearSearch() {
    this.keyword = '';
    this.showSearch = false;
    this.initPage();
    this.loadProducts();
  }

  triggerSearch(ev: any) {
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.keyword = val;
      this.initPage();
      this.loadProducts();
    }
  }

  view(product: Product) {
    this.navCtrl.push('ProductDetailPage', {
      product: product
    });
  }

  doInfinite(infiniteScroll) {
    this.page.pageNumber = this.page.pageNumber + 1;
    this.loadProducts();
    infiniteScroll.complete();
  }

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

  viewOrder() {
    this.commonProvider.goToPage('OrderPage', {});
  }

  refresh() {
    this.commonProvider.goToPage('ProductListPage', {});
  }

  private stopLoading() {
    this.loading.dismiss();
  }

}

