import { Component } from '@angular/core';
import { IonicPage, NavController, Events, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { MessageProvider } from '../../providers/message/message';
import { UserProvider } from '../../providers/user/user';

import * as Constant from "../../constant/constant";
import { User } from '../../models/user.model';


@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  isReadyToSave: boolean;

  form: FormGroup;

  user: User;

  passwordOld: string;

  password: string;

  passwordConfirm: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public events: Events,
    public messageProvider: MessageProvider,
    public userProvider: UserProvider,
    public formBuilder: FormBuilder) {
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
      oldPassword: [this.passwordOld, Validators.required],
      password: [this.password, Validators.required],
      passwordConfirm: [this.passwordConfirm, Validators.required]
    });

    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  save() {
    if (!this.form.valid) {
      return;
    } else if (this.form.value.password !== this.form.value.passwordConfirm) {
      this.messageProvider.toastPasswordNotConfirmed();
    } else {
      this.messageProvider.confirmSave(() => this.saveCallback(this.form.value));
    }
  }

  private saveCallback(values: any): void {
    console.log(JSON.stringify(values));
  }

  private showMessage(): void {
    this.navCtrl.popToRoot();
    this.messageProvider.toastSave();
  }

}
