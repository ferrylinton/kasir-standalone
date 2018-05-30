import { Component } from '@angular/core';
import { IonicPage, ToastController, AlertController, Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { SettingProvider } from '../../providers/setting/setting';
import { LANGUAGES, CURRENCIES, VIEW_TYPES, SETTING } from '../../constant/setting';
import { BasePage } from '../base/base';


@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage extends BasePage {

  setting: any;

  languages: Array<string>;

  currencies: Array<string>;

  viewTypes: Array<string>;

  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public translate: TranslateService,
    public storage: Storage,
    public events: Events,
    public settingProvider: SettingProvider) {

    super(toastCtrl, alertCtrl, translate, storage, events);
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

  save() {
    this.showEditConfirm(SETTING, (base) => this.saveCallback());
  }

  saveCallback(): void {
    this.settingProvider.setSetting(this.setting);
    this.settingProvider.getSetting().subscribe(setting => {
      this.setting = JSON.parse(JSON.stringify(setting));
    });

    this.showEditToast(SETTING);
  }

}
