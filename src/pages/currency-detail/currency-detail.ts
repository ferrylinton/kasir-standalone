import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import * as Constant from "../../constant/constant";
import { MessageProvider } from '../../providers/message/message';
import { CurrencyProvider } from '../../providers/currency/currency';
import { Currency } from '../../models/currency.model';


@IonicPage()
@Component({
  selector: 'page-currency-detail',
  templateUrl: 'currency-detail.html',
})
export class CurrencyDetailPage {

  currency: Currency;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public events: Events,
    public translateService: TranslateService,
    public messageProvider: MessageProvider,
    public currencyProvider: CurrencyProvider) {
  }

  ionViewWillEnter() {
    this.init();
  }

  private init(): void {
    this.currency = this.navParams.get('currency');

    if (!this.currency) {
      this.events.publish(Constant.PAGE, { page: 'CurrencyPage', params: {} });
    }
  }

  modify() {
    this.navCtrl.push('CurrencyFormPage', { currency: this.currency });
  }

  deleteCallback(): void {
    this.currencyProvider.delete(this.currency.id).subscribe(data => {
      this.navCtrl.popToRoot();
      this.translateService.get('DELETE_SUCCESS').subscribe(value => {
        this.messageProvider.toast(value);
      });
    }, error => {
      this.messageProvider.toast('Error : ' + error);
    });
  }

  delete() {
    this.messageProvider.confirmDelete((currency) => this.deleteCallback());
  }

}
