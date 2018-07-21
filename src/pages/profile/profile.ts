import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { UserProvider } from '../../providers/user/user';
import { MessageProvider } from '../../providers/message/message';
import * as Constant from "../../constant/constant";
import { User } from '../../models/user.model';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public storage: Storage,
    public userProvider: UserProvider,
    public messageProvider: MessageProvider
  ) {
  }

  ionViewWillEnter() {
    this.init();
  }

  private init(): void {
    this.storage.get(Constant.LOGGED_USER).then((value) => {
      this.user = JSON.parse(value);

      if (!this.user) {
        this.events.publish(Constant.PAGE, { page: 'LoginPage', params: {} });
      } else {
        forkJoin([this.userProvider.findById(this.user.createdBy),
        this.userProvider.findById(this.user.lastModifiedBy)]).subscribe(results => {
          this.user.createdBy = results[0];
          this.user.lastModifiedBy = results[1];
        }, error => {
          this.messageProvider.toast('Error : ' + error);
        });
      }
    });
  }

  modify() {
    this.navCtrl.push('ProfileFormPage', {user: this.user});
  }

  changePassword() {
    this.navCtrl.push('ChangePasswordPage', {user: this.user});
  }
}
