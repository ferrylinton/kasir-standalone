import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { SettingProvider } from '../../providers/setting/setting';
import { SETTING } from '../../constant/setting';
import { MessageProvider } from '../../providers/message/message';
import { Setting } from '../../models/setting.model';
import { CurrencyProvider } from '../../providers/currency/currency';
import { Currency } from '../../models/currency.model';


@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage{
  
  setting: Setting;

  currencies: Array<Currency>;

  constructor(
    public messageProvider: MessageProvider,
    public currencyProvider: CurrencyProvider,
    public settingProvider: SettingProvider) {
  }

  ionViewWillEnter() {
    this.initSetting();
    this.initCurrencies();
  }

  private initSetting(){
    this.settingProvider.getSetting().subscribe(setting => {
      this.setting = JSON.parse(JSON.stringify(setting));
    });
  }

  private initCurrencies(){
    this.currencyProvider.findAll().subscribe(currencies => {
      this.currencies = currencies;
    })
  }

  save() {
    this.messageProvider.showSaveConfirm(false, SETTING, (base) => this.saveCallback());
  }

  saveCallback(): void {
    this.settingProvider.setSetting(this.setting);
    this.settingProvider.getSetting().subscribe(setting => {
      this.setting = JSON.parse(JSON.stringify(setting));
    });

    this.messageProvider.showEditToast(SETTING);
  }
  

}
