import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  pageable: Pageable;

  page: Page<Role>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public roleProvider: RoleProvider,
    public userProvider: UserProvider) {

    this.init();
  }

  ionViewWillEnter() {
    this.init();
  }

  private init(): void {
    this.pageable = new Pageable(1);
    this.loadData(this.pageable);
  }

  private loadData(pageable: Pageable) {
    this.userProvider.find(pageable).subscribe(page => {
      this.page = page;
    })
  }

  previous(): void {
    if (this.pageable.pageNumber > 1) {
      this.pageable = new Pageable(this.page.pageNumber - 1, this.page.totalData);
      this.loadData(this.pageable);
    }
  }

  next(): void {
    if (this.pageable.pageNumber < this.page.getTotalPage()) {
      this.pageable = new Pageable(this.page.pageNumber + 1, this.page.totalData);
      this.loadData(this.pageable);
    }
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

}
