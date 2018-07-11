import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { BaseListPage } from '../base/base-list';
import { CurrencyProvider } from '../../providers/currency/currency';
import { Currency } from '../../models/currency.model';


@IonicPage()
@Component({
  selector: 'page-currency',
  templateUrl: 'currency.html',
})
export class CurrencyPage extends BaseListPage<Currency>{

  constructor(public navCtrl: NavController, public currencyProvider: CurrencyProvider){
    super('name');
  }

  ionViewWillEnter() {
    this.initPage();
    this.loadData();
  }

  loadData() {
    this.currencyProvider.findByName(this.keyword, this.page).subscribe(page => {
      this.page.pageNumber = page.pageNumber;
      this.page.totalData = page.totalData;
      this.page.data = [...this.page.data, ...page.data];
    })
  }

  view(currency: Currency) {
    this.navCtrl.push('CurrencyDetailPage', { currency: currency });
  }

  create() {
    this.navCtrl.push('CurrencyFormPage', { currency: new Currency('') });
  }

}
