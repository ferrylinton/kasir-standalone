import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { TranslateService } from '@ngx-translate/core';
import { SettingProvider } from '../../providers/setting/setting';
import { MessageProvider } from '../../providers/message/message';
import { ProductProvider } from '../../providers/product/product';

import { BaseListPage } from '../base/base-list';
import { Product } from '../../models/product.model';

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage extends BaseListPage<Product>{

  private DETAIL_PAGE: string = 'ProductDetailPage';

  private FORM_PAGE: string = 'ProductFormPage';

  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public events: Events,
    public translateService: TranslateService,
    public settingProvider: SettingProvider,
    public messageProvider: MessageProvider,
    public productProvider: ProductProvider
  ) {
    super(storage, events, translateService, settingProvider, messageProvider, productProvider, 'name');
  }

  ionViewWillEnter() {
    this.initPage();
    this.loadData();
  }

  loadData() {
    this.productProvider.findByName(this.keyword, this.page).subscribe(page => {
      this.page.pageNumber = page.pageNumber;
      this.page.totalData = page.totalData;
      this.page.data = [...this.page.data, ...page.data];
    })
  }

  view(product: Product) {
    this.navCtrl.push(this.DETAIL_PAGE, { product: product });
  }

  create() {
    this.navCtrl.push(this.FORM_PAGE, { product: new Product('') });
  }

}
