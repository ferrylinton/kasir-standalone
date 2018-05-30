import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { SettingProvider } from '../../providers/setting/setting';


@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  setting: any;

  constructor(public settingProvider: SettingProvider) {
    this.settingProvider.getSetting().subscribe(setting => {
      this.setting = JSON.parse(JSON.stringify(setting));
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  ionViewWillEnter() {
    
  }

  save(): void{
    console.log(JSON.stringify(this.setting));
  }
}
