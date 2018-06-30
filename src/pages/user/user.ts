import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { v4 as uuid } from 'uuid';

import { TranslateService } from '@ngx-translate/core';
import { SettingProvider } from '../../providers/setting/setting';
import { MessageProvider } from '../../providers/message/message';
import { UserProvider } from '../../providers/user/user';

import { BaseListPage } from '../base/base-list';
import { User } from '../../models/user.model';


@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage extends BaseListPage<User>{

  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public events: Events,
    public translateService: TranslateService,
    public settingProvider: SettingProvider,
    public messageProvider: MessageProvider,
    public userProvider: UserProvider) {

    super(storage, events, translateService, settingProvider, messageProvider, userProvider, 'fullname');
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
