import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { SettingProvider } from '../../providers/setting/setting';
import { SETTING } from '../../constant/setting';
import { MessageProvider } from '../../providers/message/message';


@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage{

  setting: any;

  constructor(
    public messageProvider: MessageProvider,
    public settingProvider: SettingProvider) {

    this.initSetting();
  }

  private initSetting(){
    this.settingProvider.getSetting().subscribe(setting => {
      this.setting = JSON.parse(JSON.stringify(setting));
    });
  }

  save() {
    this.messageProvider.showEditConfirm(SETTING, (base) => this.saveCallback());
  }

  saveCallback(): void {
    this.settingProvider.setSetting(this.setting);
    this.settingProvider.getSetting().subscribe(setting => {
      this.setting = JSON.parse(JSON.stringify(setting));
    });

    this.messageProvider.showEditToast(SETTING);
  }

}
