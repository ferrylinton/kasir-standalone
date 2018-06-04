import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';

import * as Setting from '../../constant/setting';


@Injectable()
export class SettingProvider {

  private setting: any;

  constructor(public storage: Storage) {
  }

  public getSetting(): Observable<any> {
    if (this.setting) {
      return of(this.setting);
    } else {
      return fromPromise(this.storage.get(Setting.SETTING).then((result) => {
        if (result) {
          this.setting = JSON.parse(result);
        } else {
          this.setting = {};
          this.setting[Setting.LANGUAGE] = Setting.DEFAULT_LANGUAGE;
          this.setting[Setting.CURRENCY] = Setting.DEFAULT_CURRENCY;
          this.setting[Setting.VIEW_TYPE] = Setting.DEFAULT_VIEW_TYPE;
          this.setting[Setting.DATETIME_FORMAT] = Setting.DEFAULT_DATETIME_FORMAT;
          this.setting[Setting.DATE_FORMAT] = Setting.DEFAULT_DATE_FORMAT;
          this.setting[Setting.CURRENCY_SYMBOL] = Setting.DEFAULT_CURRENCY_SYMBOL;
          this.storage.set(Setting.SETTING, JSON.stringify(this.setting));
        }

        return this.setting;
      }));
    }
  }

  public setSetting(setting: any): void {
    this.setting = setting;
    this.storage.set(Setting.SETTING, JSON.stringify(this.setting));
  }

  public getLanguage(): Observable<string> {
    let language: Subject<string> = new Subject<string>();

    this.getSetting().subscribe(setting => {
      language.next(setting[Setting.LANGUAGE]);
      language.complete();
    });

    return language;
  }

  public getCurrency(): Observable<string> {
    let currency: Subject<string> = new Subject<string>();

    this.getSetting().subscribe(setting => {
      currency.next(setting[Setting.CURRENCY]);
      currency.complete();
    });

    return currency;
  }

  public getCurrencySymbol(): Observable<string> {
    let currencySymbol: Subject<string> = new Subject<string>();

    this.getSetting().subscribe(setting => {
      currencySymbol.next(setting[Setting.CURRENCY_SYMBOL]);
      currencySymbol.complete();
    });

    return currencySymbol;
  }

  public getView(): Observable<boolean> {
    let view: Subject<boolean> = new Subject<boolean>();

    this.getSetting().subscribe(setting => {
      view.next(setting[Setting.VIEW_TYPE]);
      view.complete();
    });

    return view;
  }

  public getDatetimeFormat(): Observable<string> {
    let datetimeFormat: Subject<string> = new Subject<string>();

    this.getSetting().subscribe(setting => {
      datetimeFormat.next(setting[Setting.DATETIME_FORMAT]);
      datetimeFormat.complete();
    });

    return datetimeFormat;
  }

  public getDateFormat(): Observable<string> {
    let dateFormat: Subject<string> = new Subject<string>();

    this.getSetting().subscribe(setting => {
      dateFormat.next(setting[Setting.DATE_FORMAT]);
      dateFormat.complete();
    });

    return dateFormat;
  }

  public setLanguage(value: string) {
    this.setting[Setting.LANGUAGE] = value;
    this.storage.set(Setting.SETTING, this.setting);
  }

  public setCurrency(value: string) {
    this.setting[Setting.CURRENCY] = value;
    this.storage.set(Setting.SETTING, this.setting);
  }

  public setView(value: string) {
    this.setting[Setting.VIEW_TYPE] = value;
    this.storage.set(Setting.SETTING, this.setting);
  }

}
