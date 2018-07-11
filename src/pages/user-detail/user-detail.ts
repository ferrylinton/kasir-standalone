import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { PAGE } from '../../constant/constant';
import { MessageProvider } from '../../providers/message/message';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/user.model';

@IonicPage()
@Component({
  selector: 'page-user-detail',
  templateUrl: 'user-detail.html',
})
export class UserDetailPage{

  private user: User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public messageProvider: MessageProvider,
    public userProvider: UserProvider) {
  }

  ionViewWillEnter() {
    this.init();
  }

  private init(): void {
    this.user = this.navParams.get('user');

    if (!this.user) {
      this.events.publish(PAGE, { page: 'UserPage', params: {} });
    } else {
      console.log('----------- this.user.activated : ' + this.user.activated);
      forkJoin([this.userProvider.findById(this.user.createdBy),
      this.userProvider.findById(this.user.lastModifiedBy)]).subscribe(results => {
        this.user.createdBy = results[0];
        this.user.lastModifiedBy = results[1];
      });
    }
  }

  modify() {
    this.navCtrl.push('UserFormPage', { user: this.user });
  }

  deleteCallback(): void {
    this.userProvider.delete(this.user.id).subscribe(result => {
      this.navCtrl.popToRoot();
      this.messageProvider.toastDelete();
    }, error => {
      this.messageProvider.toast('Error : ' + error);
    });
  }

  delete() {
    this.messageProvider.confirmDelete(() => this.deleteCallback());
  }

}
