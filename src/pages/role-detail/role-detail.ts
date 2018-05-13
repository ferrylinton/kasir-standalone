import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, AlertController } from 'ionic-angular';
import { Role } from '../../models/role.model';
import { DETAIL } from '../../constant/constant';
import { BasePage } from '../base/base';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { RoleProvider } from '../../providers/role/role';

@IonicPage()
@Component({
  selector: 'page-role-detail',
  templateUrl: 'role-detail.html',
})
export class RoleDetailPage extends BasePage {

  private role: Role;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public translate: TranslateService,
    public storage: Storage,
    public navParams: NavParams,
    public events: Events,
    public roleProvider: RoleProvider) {

    super(toastCtrl, alertCtrl, translate, storage);

    this.initRole(navParams);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoleDetailPage');
  }

  private initRole(navParams: NavParams): void {
    this.role = navParams.get('role');
    let message: string = 'Reload page';

    if (this.role === undefined) {
      this.translate.get('MESSAGE.RELOAD_PAGE').subscribe(value => {
        message = value;
      });

      this.showToast(message);
      this.events.publish(DETAIL, 'RolePage');
    }
  }

  edit() {
    this.navCtrl.push('RoleEditPage', {
      'role': this.role
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
