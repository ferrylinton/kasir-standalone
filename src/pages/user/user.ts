import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { v4 as uuid } from 'uuid';

import { RoleProvider } from '../../providers/role/role';
import { UserProvider } from '../../providers/user/user';

import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';
import { Role } from '../../models/role.model';
import { User } from '../../models/user.model';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  page: Page<User>;

  constructor(
    public navCtrl: NavController,
    public roleProvider: RoleProvider,
    public userProvider: UserProvider) {

    this.initPage();
  }

  ionViewWillEnter() {
    this.loadData();
  }

  private initPage(): void {
    this.page = new Page();
    this.page.sort.column = 'fullname';
    this.page.sort.isAsc = true;
  }

  private loadData() {
    this.userProvider.find(this.page).subscribe(page => {
      this.page.pageNumber = page.pageNumber;
      this.page.totalData = page.totalData;
      this.page.data = [...this.page.data, ...page.data];
    })
  }

  view(user: User) {
    this.navCtrl.push('UserDetailPage', {
      user: user
    });
  }

  add() {
    let user = new User(uuid());

    this.navCtrl.push('UserAddPage', {
      user: user
    });
  }

  doInfinite(infiniteScroll) {
    this.page.pageNumber = this.page.pageNumber + 1;
    this.loadData();
    infiniteScroll.complete();
  }
}
