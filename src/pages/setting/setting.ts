import { Component } from '@angular/core';
import { IonicPage, ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { SettingProvider } from '../../providers/setting/setting';
import { LANGUAGES, CURRENCIES, VIEW_TYPES, SETTING } from '../../constant/setting';


@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  setting: any;

  languages: Array<string>;

  currencies: Array<string>;

  viewTypes: Array<string>;

  constructor(
    public toastCtrl: ToastController,
    public translate: TranslateService,
    public settingProvider: SettingProvider) {

    this.settingProvider.getSetting().subscribe(setting => {
      this.setting = JSON.parse(JSON.stringify(setting));
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  ionViewWillEnter() {
    this.languages = LANGUAGES;
    this.currencies = CURRENCIES;
    this.viewTypes = VIEW_TYPES;
  }

  save(): void {
    this.settingProvider.setSetting(this.setting);
    this.settingProvider.getSetting().subscribe(setting => {
      this.setting = JSON.parse(JSON.stringify(setting));
    });

    this.translate.get('MESSAGE.EDIT_SUCCESS', { data: SETTING }).subscribe((value: string) => {
      this.showToast(value);
    });
  }

  showToast(message: string): void {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }
}
