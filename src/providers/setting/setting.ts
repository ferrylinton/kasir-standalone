import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';

import * as Contant from '../../constant/setting';
import { Setting } from '../../models/setting.model';


@Injectable()
export class SettingProvider {

  private setting: Setting;

  constructor(public storage: Storage) {
    this.setting = new Setting(
      Contant.LANGUAGE, 
      Contant.CURRENCY,
      Contant.CURRENCY_FORMAT,
      Contant.DATE_FORMAT,
      Contant.DATETIME_FORMAT
    )
  }

  public getSetting(): Observable<Setting> {
    if (this.setting) {
      return of(this.setting);
    } else {
      return fromPromise(this.storage.get(Contant.SETTING).then((result) => {
        if (result) {
          this.setting = JSON.parse(result);
        } else {
          this.setting.language = Contant.LANGUAGE;
          this.setting.currency = Contant.CURRENCY;
          this.setting.currencyFormat = Contant.CURRENCY_FORMAT;
          this.setting.dateFormat = Contant.DATE_FORMAT;
          this.setting.datetimeFormat = Contant.DATETIME_FORMAT;
          this.storage.set(Contant.SETTING, JSON.stringify(this.setting));
        }

        return this.setting;
      }));
    }
  }

  public setSetting(setting: Setting): void {
    this.setting = setting;
    this.storage.set(Contant.SETTING, JSON.stringify(this.setting));
  }

  public setLanguage(value: string) {
    this.setting.language = value;
    this.storage.set(Contant.SETTING, this.setting);
  }

  public setCurrency(value: string) {
    this.setting.currency = value;
    this.storage.set(Contant.SETTING, this.setting);
  }

}
