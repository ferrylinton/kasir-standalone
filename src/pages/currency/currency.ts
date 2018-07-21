import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { BaseListPage } from '../base/base-list';
import { CurrencyProvider } from '../../providers/currency/currency';
import { Currency } from '../../models/currency.model';


@IonicPage()
@Component({
  selector: 'page-currency',
  templateUrl: 'currency.html',
})
export class CurrencyPage extends BaseListPage<Currency>{

  constructor(
    public navCtrl: NavController,
    public translate: TranslateService,
    public currencyProvider: CurrencyProvider
  ) {
    super(translate);
  }

  ionViewWillEnter() {
    this.initPage();
    this.loadData();
  }

  loadData() {
    this.currencyProvider.findByName(this.keyword, this.page).subscribe(page => {
      this.setPage(page);
    }, (error) => {
      this.message = 'Error : ' + error;
    });
  }

  view(currency: Currency) {
    this.navCtrl.push('CurrencyDetailPage', { currency: currency });
  }

  create() {
    this.navCtrl.push('CurrencyFormPage', { currency: new Currency() });
  }

}
