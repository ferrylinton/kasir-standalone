import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";

import { MessageProvider } from '../../providers/message/message';
import { SettingProvider } from '../../providers/setting/setting';
import { CurrencyProvider } from '../../providers/currency/currency';
import { Setting } from '../../models/setting.model';
import { Currency } from '../../models/currency.model';


@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage{
  
  setting: Setting;

  currencies: Array<Currency>;

  current: Date;

  constructor(
    public translate: TranslateService,
    public messageProvider: MessageProvider,
    public currencyProvider: CurrencyProvider,
    public settingProvider: SettingProvider) {
  }

  ionViewWillEnter() {
    this.initSetting();
    this.initCurrencies();
    this.current = new Date();
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
    this.messageProvider.confirmSave((base) => this.saveCallback());
  }

  saveCallback(): void {
    this.settingProvider.setSetting(this.setting);
    this.settingProvider.getSetting().subscribe(setting => {
      this.setting = JSON.parse(JSON.stringify(setting));
    });

    this.translate.get('SAVE_SUCCESS').subscribe(value => {
      this.messageProvider.toast(value);
    })
  }
  
}
