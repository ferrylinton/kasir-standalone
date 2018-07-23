import { Component } from '@angular/core';
import { IonicPage, NavController, Events, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { MessageProvider } from '../../providers/message/message';
import { UserProvider } from '../../providers/user/user';

import * as Constant from "../../constant/constant";
import { User } from '../../models/user.model';
import { OpenPGPProvider } from '../../providers/openpgp/openpgp';

export interface ChangePassword {
  passwordOld: string;
  password: string;
  passwordConfirm: string;
}

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  isReadyToSave: boolean;

  form: FormGroup;

  user: User;

  changePassword: ChangePassword = { passwordOld : '', password : '', passwordConfirm : ''};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public events: Events,
    public messageProvider: MessageProvider,
    public userProvider: UserProvider,
    public formBuilder: FormBuilder,
    public openPGPProvider: OpenPGPProvider) {
  }

  ionViewWillEnter() {
    this.init();
  }

  private init(): void {
    this.user = this.navParams.get('user');

    if (this.user) {
      this.initForm();
    } else {
      this.events.publish(Constant.PAGE, { page: 'ProfilePage', params: {} });
    }
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      oldPassword: [this.changePassword.passwordOld, Validators.required],
      password: [this.changePassword.password, Validators.required],
      passwordConfirm: [this.changePassword.passwordConfirm, Validators.required]
    });

    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  save() {
    if (!this.form.valid) {
      return;
    } else if (this.form.value.oldPassword !== this.user.password) {
      this.messageProvider.toastPasswordInvalid();
    } else if (this.form.value.password !== this.form.value.passwordConfirm) {
      this.messageProvider.toastPasswordNotConfirmed();
    } else {
      this.messageProvider.confirmSave(() => this.saveCallback(this.form.value));
    }
  }

  private saveCallback(changePassword: ChangePassword): void {
    this.openPGPProvider.encryptWithPassword(changePassword.password).then(encryptedPassword => {
      this.user.password = encryptedPassword;
      this.modify(this.user);
    }).catch(error => {
      this.messageProvider.toast('Error : ' + error);
    });
  }

  modify(user: User): void {
    user.id = this.user.id;
    this.userProvider.update(user).subscribe(result => {
      this.showMessage();
    }, (error) => {
      this.messageProvider.toast('Error : ' + error);
    });
  }

  private showMessage(): void {
    this.navCtrl.popToRoot();
    this.messageProvider.toastSave();
  }

}
