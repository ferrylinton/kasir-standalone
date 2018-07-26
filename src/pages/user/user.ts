import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { BaseListPage } from '../base/base-list';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/user.model';
import { OpenPGPProvider } from '../../providers/openpgp/openpgp';


@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage extends BaseListPage<User>{

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public translate: TranslateService,
    public userProvider: UserProvider,
    public openPGPProvider: OpenPGPProvider
  ) {
    super(loadingCtrl, translate);
  }

  ionViewWillEnter() {
    this.initPage();
    this.loadData();
  }

  loadData() {
    this.userProvider.findByFullname(this.keyword, this.page).subscribe(page => {
      this.setPage(page);
    }, (error) => {
      this.message = 'Error : ' + error;
    });
  }

  view(user: User) {
    let userClone:User = JSON.parse(JSON.stringify(user));

    this.openPGPProvider.decryptWithPassword(userClone.password).then(plainPassword => {
      userClone.password = plainPassword;
      this.navCtrl.push('UserDetailPage', { user: userClone });
    }).catch(error => {
      this.message = 'Error : ' + error;
    });
  }

  create() {
    this.navCtrl.push('UserFormPage', { user: new User() });
  }

}
