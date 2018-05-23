import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { BaseCart } from '../base/base-cart';
import { ProductProvider } from '../../providers/product/product';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';
import { Product } from '../../models/product.model';



@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage extends BaseCart {

  page: Page<Product>;

  isGrid: boolean = true;

  constructor(
    public navCtrl: NavController,
    public productProvider: ProductProvider,
    public storage: Storage) {

    super(storage);
    this.init();
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    this.init();
    this.getTotalItems();
  }

  viewOrder() {
    this.navCtrl.push('OrderPage');
  }

  private init(): void {
    this.page = new Page(new Array<Product>(), 1, 0);
    this.loadData(this.page);
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

  setView(isGrid: boolean){
    this.isGrid = isGrid;
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

  search(ev: any) {
    // Reset items back to all of the items
    this.init();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.page.data = this.page.data.filter((product) => {
        return (product.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}

