import { Pipe } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { SettingProvider } from '../providers/setting/setting';

@Pipe({
  name: 'currency',
  pure: false
})
export class CurrencyPipe {

  formated: string = '';

  constructor(public settingProvider: SettingProvider) {
  }

  transform(value) {
    this.settingProvider.getSetting().subscribe(setting => {
      if (value && setting) {
        let pipe = new DecimalPipe(setting.language);
        this.formated = setting.currency + ' ' + pipe.transform(value, setting.currencyFormat);
      }
    })

    return this.formated;
  }
}
