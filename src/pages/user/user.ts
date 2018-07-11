import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { BaseListPage } from '../base/base-list';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/user.model';


@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage extends BaseListPage<User>{

  constructor(public navCtrl: NavController, public userProvider: UserProvider) {
    super('fullname');
  }

  ionViewWillEnter() {
    this.initPage();
    this.loadData();
  }

  loadData() {
    this.userProvider.findByFullname(this.keyword, this.page).subscribe(page => {
      this.page.pageNumber = page.pageNumber;
      this.page.totalData = page.totalData;
      this.page.data = [...this.page.data, ...page.data];
    })
  }
  
  view(user: User) {
    this.navCtrl.push('UserDetailPage', { user: user });
  }

  create() {
    this.navCtrl.push('UserFormPage', { user: new User('') });
  }

}
