import { Pipe } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { SettingProvider } from '../providers/setting/setting';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Pipe({
  name: 'currency',
  pure: false
})
export class CurrencyPipe {

  formated: string;

  constructor(public settingProvider: SettingProvider) {
  }

  transform(value) {
    this.settingProvider.getSetting().subscribe(setting => {
      if (value) {
        let decimalPipe = new DecimalPipe(setting.language);
        this.formated = setting.currency + ' ' + decimalPipe.transform(value, setting.currencyFormat);
      }
    })

    return this.formated;
  }
}
