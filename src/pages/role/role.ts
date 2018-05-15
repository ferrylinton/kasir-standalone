import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { v4 as uuid } from 'uuid';

import { AuthorityProvider } from '../../providers/authority/authority';
import { RoleProvider } from '../../providers/role/role';

import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';
import { Role } from '../../models/role.model';


@IonicPage()
@Component({
  selector: 'page-role',
  templateUrl: 'role.html',
})
export class RolePage {

  pageable: Pageable;

  page: Page<Role>;

  constructor(
    public navCtrl: NavController,
    public authorityProvider: AuthorityProvider,
    public roleProvider: RoleProvider) {

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
    this.roleProvider.find(pageable).subscribe(page => {
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

  view(role: Role) {
    this.navCtrl.push('RoleDetailPage', {
      role: role
    });
  }

  add() {
    let role = new Role(uuid());
    role.authorities = new Array<string>();

    this.navCtrl.push('RoleAddPage', {
      role: role
    });
  }

}
