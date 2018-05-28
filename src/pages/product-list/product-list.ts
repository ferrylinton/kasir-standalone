import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, AlertController, Slides, PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

import { BaseCart } from '../base/base-cart';
import { UtilProvider } from '../../providers/util/util';
import { ProductProvider } from '../../providers/product/product';
import { Page } from '../../models/page.model';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';
import { CategoryProvider } from '../../providers/category/category';
import { MoreMenuPage } from '../more-menu/more-menu';
import { MoreMenu } from '../../models/more-menu.model';


@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage extends BaseCart {

  @ViewChild(Slides) slides: Slides;

  @ViewChild('searchbar') searchbar: any;

  private gridTxt: string = 'Grid';

  private listTxt: string = 'List';

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
    public alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    public translate: TranslateService,
    public storage: Storage,
    public util: UtilProvider,
    public productProvider: ProductProvider,
    public categoryProvider: CategoryProvider) {

    super(storage, util);
    this.initLanguage();
    this.init();
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    this.init();
    this.getTotalItems();
  }

  private initLanguage(): void {
    this.translate.get([ 'LABEL.GRID', 'LABEL.LIST']).subscribe(values => {
        this.listTxt = values['LABEL.LIST'];
        this.gridTxt = values['LABEL.GRID'];
      });
  }

  private init(): void {
    this.initPage();
    this.initCategories();
    this.loadData();
  }

  private initPage(): void {
    this.page = new Page();
    this.page.sort.column = 'name';
    this.page.sort.isAsc = true;
  }

  private initCategories(): void {
    if (this.categories == null) {
      this.categoryProvider.findAll().subscribe(categories => {
        this.categories = categories;
        this.categories.unshift(new Category(this.category, 'All'));
      })
    }

    this.showLeftButton = false;
    this.showRightButton = this.categories.length > 1;
  }

  private loadData() {
    this.productProvider.findByCategoryAndName(this.category, this.keyword, this.page).subscribe(page => {
      this.page.pageNumber = page.pageNumber;
      this.page.totalData = page.totalData;
      this.page.data = [...this.page.data, ...page.data];
    })
  }

  public slideChanged(): void {
    let index = this.slides.getActiveIndex();
    this.showLeftButton = index !== 0;
    this.showRightButton = index !== this.categories.length - 1;
    this.category = index === 0 ? '' : this.categories[index].name;
    this.initPage();
    this.loadData();
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
    this.loadData();
  }

  triggerSearch(ev: any) {
    this.init();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.keyword = val;
      this.initPage();
      this.loadData();
    }
  }

  viewOrder() {
    this.navCtrl.push('OrderPage');
  }

  view(product: Product) {
    this.navCtrl.push('ProductDetailPage', {
      product: product
    });
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.page.pageNumber = this.page.pageNumber + 1;
      this.loadData();
      infiniteScroll.complete();
    }, 2000);
  }

  showMore(event: Event) {
    let menus = new Array<MoreMenu>();
    menus.push(new MoreMenu('apps', this.gridTxt, 'grid'));
    menus.push(new MoreMenu('menu', this.listTxt, 'list'));

    let moreMenuPage = this.popoverCtrl.create(MoreMenuPage, { menus: menus });
    moreMenuPage.onDidDismiss(val => {
      console.log(val);
      if (val === 'grid') {
        this.showGrid = true;
      } else if (val === 'list') {
        this.showGrid = false;
      }
    });

    moreMenuPage.present({ ev: event });
  }

}

