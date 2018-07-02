import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { SettingProvider } from '../../providers/setting/setting';
import { MessageProvider } from '../../providers/message/message';
import { UserProvider } from '../../providers/user/user';
import { BasePage } from '../base/base';
import { User } from '../../models/user.model';

@IonicPage()
@Component({
  selector: 'page-user-detail',
  templateUrl: 'user-detail.html',
})
export class UserDetailPage extends BasePage {

  private RELOAD_PAGE: string = 'UserPage';

  private FORM_PAGE: string = 'UserFormPage';

  private DATA: string = 'user';

  private user: User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public events: Events,
    public translateService: TranslateService,
    public settingProvider: SettingProvider,
    public messageProvider: MessageProvider,
    public userProvider: UserProvider) {

    super(storage, events, translateService, settingProvider, messageProvider);
    this.init();
  }

  private init(): void {
    this.user = this.navParams.get(this.DATA);

    if (this.user === undefined) {
      this.reloadPage(this.RELOAD_PAGE);
    }
  }

  modify() {
    this.navCtrl.push(this.FORM_PAGE, { user: this.user });
  }

  deleteCallback(user: User): void {
    this.userProvider.delete(user.id).subscribe(result => {
      this.navCtrl.popToRoot();
      this.messageProvider.showDeleteToast(result.fullname);
    });
  }

  delete() {
    this.messageProvider.showDeleteConfirm(this.user.fullname, (user) => this.deleteCallback(this.user));
  }

}
