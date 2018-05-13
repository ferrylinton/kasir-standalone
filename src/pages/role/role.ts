import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pageable } from '../../models/pageable.model';
import { Role } from '../../models/role.model';
import { Page } from '../../models/page.model';
import { AuthorityProvider } from '../../providers/authority/authority';
import { RoleProvider } from '../../providers/role/role';

@IonicPage()
@Component({
  selector: 'page-role',
  templateUrl: 'role.html',
})
export class RolePage {

  private pageable: Pageable;

  private page: Page<Role>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authorityProvider: AuthorityProvider,
    public roleProvider: RoleProvider) {

    console.log('...constructor RolePage');
    this.init();
  }

  ionViewDidLoad() {
    console.log('...ionViewDidLoad RolePage');
  }

  ionViewWillEnter() {
    console.log('...ionViewWillEnter RolePage');
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
      'role': role
    });
  }

  add() {
    this.navCtrl.push('RoleAddPage');
  }

}
