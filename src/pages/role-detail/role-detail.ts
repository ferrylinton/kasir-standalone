import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { RoleProvider } from '../../providers/role/role';
import { BasePage } from '../base/base';
import { Role } from '../../models/role.model';

@IonicPage()
@Component({
  selector: 'page-role-detail',
  templateUrl: 'role-detail.html',
})
export class RoleDetailPage extends BasePage {

  private role: Role;

  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public translate: TranslateService,
    public storage: Storage,
    public events: Events,
    public navCtrl: NavController,
    public navParams: NavParams,
    public roleProvider: RoleProvider) {

    super(toastCtrl, alertCtrl, translate, storage, events);
    this.init(navParams);
  }

  private init(navParams: NavParams): void {
    this.role = navParams.get('role');

    if (this.role === undefined) {
      this.reloadPage('RolePage');
    }
  }

  edit() {
    this.navCtrl.push('RoleEditPage', {
      role: this.role
    });
  }

  deleteCallback(role: Role): void {
    this.roleProvider.delete(role.id).subscribe(result => {
      this.navCtrl.popToRoot();
      this.showDeleteToast(result.name);
    });
  }

  delete() {
    this.showDeleteConfirm(this.role.name, (role) => this.deleteCallback(this.role));
  }

}
