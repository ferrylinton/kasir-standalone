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
  selector: 'page-user-add',
  templateUrl: 'user-add.html',
})
export class UserAddPage extends BasePage {

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

    super(toastCtrl, alertCtrl, translate, storage, events);
    this.init(navParams);
  }

  private init(navParams: NavParams): void {
    this.user = navParams.get('user');

    if (this.user === undefined) {
      this.reloadPage('UserPage');
    } else {
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

  private initRoles(): void {
    this.roleProvider.findAll()
      .subscribe(roles => {
        this.roles = roles;
        this.user.role = this.roles[0].name;
      })
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      id: [this.user.id],
      username: ['', Validators.required],
      fullname: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
      role: [this.user.role, Validators.required]
    });

  }

  saveCallback(user: User): void {
    user.activated = true;
    user.createdBy = this.loggedUser.username;
    user.createdDate = new Date();
    this.userProvider.save(user).subscribe(result => {
      this.navCtrl.popToRoot();
      this.showAddToast(result.username);
    });
  }

  save() {
    if (!this.form.valid) {
      return;
    } else if (this.form.value.password !== this.form.value.passwordConfirm) {
      this.showToast(this.passwordNotMatch);
    } else {
      this.showAddConfirm(this.form.value.username, (user) => this.saveCallback(this.form.value));
    }
  }

}
