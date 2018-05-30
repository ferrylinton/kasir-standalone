import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { SETTING, LANGUAGE, BAHASA, CURRENCY, IDR, LANGUAGES, CURRENCIES } from '../../constant/setting';


@Injectable()
export class SettingProvider {

  private setting: any;

  constructor(public storage: Storage) {
  }

  public getSetting(): Observable<any> {
    if (this.setting) {
      of(this.setting);
    } else {
      return fromPromise(this.storage.get(SETTING).then((result) => {
        if (result) {
          this.setting = JSON.parse(result);
        } else {
          this.setting = {};
          this.setting[LANGUAGE] = LANGUAGES[BAHASA];
          this.setting[CURRENCY] = CURRENCIES[IDR];
          this.storage.set(SETTING, JSON.stringify(this.setting));
        }

        return this.setting;
      }));
    }
  }

  public getLanguage(): Observable<string> {
    let language: Subject<string> = new Subject<string>();

    this.getSetting().subscribe(setting => {
      language.next(setting[LANGUAGE]);
      language.complete();
    });

    return language;
  }

  public getCurrency(): Observable<string> {
    let currency: Subject<string> = new Subject<string>();

    this.getSetting().subscribe(setting => {
      currency.next(setting[CURRENCY]);
      currency.complete();
    });

    return currency;
  }

  public setLanguage(value: string) {
    this.setting[LANGUAGE] = value;
    this.storage.set(SETTING, this.setting);
  }

  public setCurrency(value: string) {
    this.setting[CURRENCY] = value;
    this.storage.set(SETTING, this.setting);
  }

}
