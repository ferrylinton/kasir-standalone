import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { Role } from '../../models/role.model';
import { DETAIL } from '../../constant/constant';

@IonicPage()
@Component({
  selector: 'page-role-detail',
  templateUrl: 'role-detail.html',
})
export class RoleDetailPage {

  private role: Role;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public toastCtrl: ToastController) {

    this.role = navParams.get('role');

    if(this.role === undefined) {
      let toast = this.toastCtrl.create({
        message: 'Role is undefined',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.events.publish(DETAIL, 'RolePage');

    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoleDetailPage');
  }

}
