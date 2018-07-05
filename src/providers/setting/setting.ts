import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';

import * as Constant from '../../constant/setting';
import { Setting } from '../../models/setting.model';


@Injectable()
export class SettingProvider {

  private setting: Setting;

  constructor(public storage: Storage) {
  }

  public getSetting(): Observable<Setting> {
    if (this.setting) {
      return of(this.setting);
    } else {
      return fromPromise(this.storage.get(Constant.SETTING).then((result) => {
        if (result) {
          this.setting = JSON.parse(result);
        } else {
          this.setting = new Setting();
          this.setting.language = Constant.LANGUAGE;
          this.setting.currency = Constant.CURRENCY;
          this.setting.currencyFormat = Constant.CURRENCY_FORMAT;
          this.setting.dateFormat = Constant.DATE_FORMAT;
          this.setting.datetimeFormat = Constant.DATETIME_FORMAT;
          this.storage.set(Constant.SETTING, JSON.stringify(this.setting));
        }

        return this.setting;
      }));
    }
  }

  public setSetting(setting: Setting): void {
    this.setting = setting;
    this.storage.set(Constant.SETTING, JSON.stringify(this.setting));
  }

  public setLanguage(value: string) {
    this.setting.language = value;
    this.storage.set(Constant.SETTING, this.setting);
  }

  public setCurrency(value: string) {
    this.setting.currency = value;
    this.storage.set(Constant.SETTING, this.setting);
  }

}
