import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { BasePage } from '../base/base';
import { RoleProvider } from '../../providers/role/role';
import { UserProvider } from '../../providers/user/user';

import { User } from '../../models/user.model';
import { Role } from '../../models/role.model';


@IonicPage()
@Component({
  selector: 'page-user-edit',
  templateUrl: 'user-edit.html',
})
export class UserEditPage{

  status: Array<{ label: string, value: boolean }>;

  roles: Role[];

  isReadyToSave: boolean;

  form: FormGroup;

  user: User;

  private passwordNotMatch: string;

  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public translate: TranslateService,
    public storage: Storage,
    public events: Events,
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public roleProvider: RoleProvider,
    public userProvider: UserProvider) {

    

  }

  /* private init(navParams: NavParams): void {
    this.user = navParams.get('user');

    if (this.user === undefined) {
      this.reloadPage('UserPage');
    } else {
      this.initStatus();
      this.initRoles();
      this.initForm();

      this.form.valueChanges.subscribe((v) => {
        this.isReadyToSave = this.form.valid;
      });
    }

    this.translate.get('MESSAGE.PASSWORD_NOT_MATCH').subscribe(value => {
      this.passwordNotMatch = value;
    });
  }

  private initStatus(): void {
    this.status = [
      { label: 'LABEL.ACTIVATED', value: true },
      { label: 'LABEL.DEACTIVATED', value: false }
    ];
  }

  private initRoles(): void {
    this.roleProvider.findAll()
      .subscribe(roles => {
        this.roles = roles;
      })
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      id: [this.user.id],
      username: [this.user.username, Validators.required],
      fullname: [this.user.fullname, Validators.required],
      password: [this.user.password, Validators.required],
      passwordConfirm: [this.user.password, Validators.required],
      role: [this.user.role, Validators.required],
      activated: [this.user.activated]
    });

  }

  saveCallback(user: User): void {
    user.activated = true;
    user.createdBy = this.user.username;
    user.createdDate = this.user.createdDate;
    user.lastModifiedBy = this.loggedUser.username;
    user.lastModifiedDate = new Date();
    this.userProvider.update(user).subscribe(result => {
      this.navCtrl.popToRoot();
      this.showEditToast(result.username);
    });
  }

  save() {
    if (!this.form.valid) {
      return;
    } else if (this.form.value.password !== this.form.value.passwordConfirm) {
      this.showToast(this.passwordNotMatch);
    } else {
      this.showEditConfirm(this.form.value.username, (user) => this.saveCallback(this.form.value));
    }
  } */

}

