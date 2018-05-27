import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, AlertController, Slides, PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

import { BaseCart } from '../base/base-cart';
import { UtilProvider } from '../../providers/util/util';
import { ProductProvider } from '../../providers/product/product';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';
import { Sort } from '../../models/sort.model';
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

  private searchTitle: string = 'Search';

  private viewTypeTitle: string = 'View Type';

  private okButton: string = 'OK';

  private searchButton: string = 'Search';

  private cancelButton: string = 'Cancel';

  private keywordTxt: string = 'Keyword';

  private gridTxt: string = 'Grid';

  private listTxt: string = 'List';

  showGrid: boolean = true;

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
    this.init();
    this.initLanguage();
    this.initializeCategories();
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    this.init();
    this.getTotalItems();
  }

  private initializeCategories(): void {
    this.categoryProvider.findAll().subscribe(categories => {
      this.categories = categories;
    })
    this.categories.unshift(new Category('0', 'All'));
   
    // Check which arrows should be shown
    this.showLeftButton = false;
    this.showRightButton = this.categories.length > 1;
  }

  public filterData(categoryId: string): void {
    console.log('filterData : ' + categoryId);
  }

  // Method executed when the slides are changed
  public slideChanged(): void {
    let index = this.slides.getActiveIndex();
    this.showLeftButton = index !== 0;
    this.showRightButton = index !== this.categories.length - 1;
    console.log('index : ' + index);
  }

  // Method that shows the next slide
  public slideNext(): void {
    this.slides.slideNext();
  }

  // Method that shows the previous slide
  public slidePrev(): void {
    this.slides.slidePrev();
  }

  viewOrder() {
    this.navCtrl.push('OrderPage');
  }

  private init(): void {
    this.page = new Page();
    this.page.sort.column = 'name';
    this.page.sort.isAsc = false;
    this.loadData(this.page);
  }

  private initLanguage(): void {
    this.translate.get([
      'TITLE.SEARCH',
      'TITLE.VIEW_TYPE',
      'BUTTON.OK',
      'BUTTON.SEARCH',
      'BUTTON.CANCEL',
      'LABEL.KEYWORD',
      'LABEL.GRID',
      'LABEL.LIST']).subscribe(values => {

        this.searchTitle = values['TITLE.SEARCH'];
        this.viewTypeTitle = values['TITLE.VIEW_TYPE'];
        this.okButton = values['BUTTON.OK'];
        this.searchButton = values['BUTTON.SEARCH'];
        this.cancelButton = values['BUTTON.CANCEL'];
        this.keywordTxt = values['LABEL.KEYWORD'];
        this.listTxt = values['LABEL.LIST'];
        this.gridTxt = values['LABEL.GRID'];
      });
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
    setTimeout(() => {
      this.page.pageNumber = this.page.pageNumber + 1;
      this.loadData(this.page);
      infiniteScroll.complete();
    }, 2000);
  }

  searchPrompt() {
    const alert = this.alertCtrl.create({
      title: this.searchTitle,
      inputs: [
        {
          name: 'keyword',
          placeholder: this.keywordTxt
        },
      ],
      buttons: [
        {
          text: this.cancelButton
        },
        {
          text: this.searchButton,
          handler: (data: any) => {
            let val = data.keyword;
            if (val && val.trim() != '') {
              this.init();
              this.page.data = this.page.data.filter((product) => {
                return (product.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
              })
            }
          }
        }
      ]
    });

    alert.present();
  }

  viewTypePrompt(event: Event) {
    let menus = new Array<MoreMenu>();
    menus.push(new MoreMenu('search', 'View Search', 'search'));
    menus.push(new MoreMenu('apps', 'View as Grid', 'grid'));
    menus.push(new MoreMenu('menu', 'View as List', 'list'));

    let moreMenuPage = this.popoverCtrl.create(MoreMenuPage, { menus: menus });
    moreMenuPage.onDidDismiss(val => {
      console.log(val);
      if(val === 'grid'){
        this.showGrid = true;
      }else if(val === 'list'){
        this.showGrid = false;
      }else if(val === 'search'){
        this.searchPrompt();
      }
    });

    moreMenuPage.present({ ev: event });
  }

  viewTypePrompt2() {
    let alert = this.alertCtrl.create({
      title: this.viewTypeTitle,
      inputs: [
        {
          type: 'radio',
          label: this.gridTxt,
          value: 'true',
          checked: this.showGrid
        },
        {
          type: 'radio',
          label: this.listTxt,
          value: 'false',
          checked: !this.showGrid
        }
      ],
      buttons: [
        {
          text: this.cancelButton
        },
        {
          text: this.okButton,
          handler: (data: any) => {
            this.showGrid = data === 'true';
          }
        }
      ]
    });

    alert.present();
  }
}

