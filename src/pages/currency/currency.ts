import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { TranslateService } from '@ngx-translate/core';
import { SettingProvider } from '../../providers/setting/setting';
import { MessageProvider } from '../../providers/message/message';
import { CurrencyProvider } from '../../providers/currency/currency';

import { BaseListPage } from '../base/base-list';
import { Currency } from '../../models/currency.model';


@IonicPage()
@Component({
  selector: 'page-currency',
  templateUrl: 'currency.html',
})
export class CurrencyPage extends BaseListPage<Currency>{

  private DETAIL_PAGE: string = 'CurrencyDetailPage';

  private FORM_PAGE: string = 'CurrencyFormPage';

  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public events: Events,
    public translateService: TranslateService,
    public settingProvider: SettingProvider,
    public messageProvider: MessageProvider,
    public currencyProvider: CurrencyProvider
  ) {
    super(storage, events, translateService, settingProvider, messageProvider, currencyProvider, 'name');
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
    this.navCtrl.push(this.DETAIL_PAGE, { currency: currency });
  }

  create() {
    this.navCtrl.push(this.FORM_PAGE, { currency: new Currency('') });
  }

}
