import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { v4 as uuid } from 'uuid';

import { TranslateService } from '@ngx-translate/core';
import { CommonProvider } from '../../providers/common/common';
import { SettingProvider } from '../../providers/setting/setting';
import { UserProvider } from '../../providers/user/user';

import { BaseCrud } from '../base/base-crud';
import { User } from '../../models/user.model';


@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage extends BaseCrud<User>{

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public translateService: TranslateService,
    public commonProvider: CommonProvider,
    public settingProvider: SettingProvider,
    public userProvider: UserProvider) {

    super(modalCtrl, translateService, commonProvider, settingProvider, userProvider, 'fullname');
  }

  ionViewWillEnter() {
    this.loadData();
  }

  view(user: User) {
    this.navCtrl.push('UserDetailPage', { user: user });
  }

  add() {
    this.navCtrl.push('UserAddPage', { user: new User(uuid()) });
  }

}
