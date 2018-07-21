import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { BaseListPage } from '../base/base-list';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/user.model';


@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage extends BaseListPage<User>{

  constructor(
    public navCtrl: NavController,
    public translate: TranslateService,
    public userProvider: UserProvider
  ) {
    super(translate);
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
    this.navCtrl.push('UserDetailPage', { user: user });
  }

  create() {
    this.navCtrl.push('UserFormPage', { user: new User() });
  }

}
