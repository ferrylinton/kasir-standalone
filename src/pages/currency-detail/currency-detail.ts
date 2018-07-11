import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { PAGE } from '../../constant/constant';
import { MessageProvider } from '../../providers/message/message';
import { UserProvider } from '../../providers/user/user';
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
    public events: Events,
    public messageProvider: MessageProvider,
    public userProvider: UserProvider,
    public currencyProvider: CurrencyProvider) {
  }

  ionViewWillEnter() {
    this.init();
  }

  private init(): void {
    this.currency = this.navParams.get('currency');

    if (!this.currency) {
      this.events.publish(PAGE, { page: 'CurrencyPage', params: {} });
    } else {
      forkJoin([this.userProvider.findById(this.currency.createdBy),
      this.userProvider.findById(this.currency.lastModifiedBy)]).subscribe(results => {
        this.currency.createdBy = results[0];
        this.currency.lastModifiedBy = results[1];
      });
    }
  }

  modify() {
    this.navCtrl.push('CurrencyFormPage', { currency: this.currency });
  }

  deleteCallback(): void {
    this.currencyProvider.delete(this.currency.id).subscribe(data => {
      this.navCtrl.popToRoot();
      this.messageProvider.toastDelete();
    }, error => {
      this.messageProvider.toast('Error : ' + error);
    });
  }

  delete() {
    this.messageProvider.confirmDelete(() => this.deleteCallback());
  }

}
