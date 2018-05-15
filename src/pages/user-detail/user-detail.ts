import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { UserProvider } from '../../providers/user/user';
import { BasePage } from '../base/base';
import { User } from '../../models/user.model';

@IonicPage()
@Component({
  selector: 'page-user-detail',
  templateUrl: 'user-detail.html',
})
export class UserDetailPage extends BasePage {

  private user: User;

  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public translate: TranslateService,
    public storage: Storage,
    public events: Events,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider) {

    super(toastCtrl, alertCtrl, translate, storage, events);
    this.init(navParams);
  }

  private init(navParams: NavParams): void {
    this.user = navParams.get('user');

    if (this.user === undefined) {
      this.reloadPage('UserPage');
    }
  }

  edit() {
    this.navCtrl.push('UserEditPage', {
      user: this.user
    });
  }

  deleteCallback(user: User): void {
    this.userProvider.delete(user.id).subscribe(result => {
      this.navCtrl.popToRoot();
      this.showDeleteToast(result.username);
    });
  }

  delete() {
    this.showDeleteConfirm(this.user.username, (user) => this.deleteCallback(this.user));
  }

}
