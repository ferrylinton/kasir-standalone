import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { SettingProvider } from '../../providers/setting/setting';
import { MessageProvider } from '../../providers/message/message';
import { CurrencyProvider } from '../../providers/currency/currency';
import { BasePage } from '../base/base';
import { Currency } from '../../models/currency.model';



@IonicPage()
@Component({
  selector: 'page-currency-detail',
  templateUrl: 'currency-detail.html',
})
export class CurrencyDetailPage extends BasePage {

  private RELOAD_PAGE: string = 'CurrencyPage';

  private FORM_PAGE: string = 'CurrencyFormPage';

  private DATA: string = 'currency';
  
  currency: Currency;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public events: Events,
    public translateService: TranslateService,
    public settingProvider: SettingProvider,
    public messageProvider: MessageProvider,
    public currencyProvider: CurrencyProvider) {

    super(storage, events, translateService, settingProvider, messageProvider);
    this.init();
  }

  private init(): void {
    this.currency = this.navParams.get(this.DATA);

    if (this.currency === undefined) {
      this.reloadPage(this.RELOAD_PAGE);
    }
  }

  modify() {
    this.navCtrl.push(this.FORM_PAGE, { currency: this.currency });
  }

  deleteCallback(): void {
    this.currencyProvider.delete(this.currency.id).subscribe(data => {
      this.navCtrl.popToRoot();
      this.messageProvider.showDeleteToast(this.currency.name);
    });
  }

  delete() {
    this.messageProvider.showDeleteConfirm(this.currency.name, (currency) => this.deleteCallback());
  }

}
