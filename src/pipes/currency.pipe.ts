import { Pipe } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { SettingProvider } from '../providers/setting/setting';
import { Setting } from '../models/setting.model';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe {

  setting: Setting;

  constructor(settingProvider: SettingProvider) {
    if (!this.setting) {
      settingProvider.getSetting().subscribe(setting => {
        this.setting = setting;
      })
    }
  }

  transform(value) {
    if (value) {
      let decimalPipe = new DecimalPipe(this.setting.language);
      return this.setting.currency + ' ' + decimalPipe.transform(value, this.setting.currencyFormat);
    }

    return value;
  }
}
