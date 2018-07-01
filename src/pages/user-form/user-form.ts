import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { v4 as uuid } from 'uuid';

import { BasePage } from '../base/base';
import { SettingProvider } from '../../providers/setting/setting';
import { MessageProvider } from '../../providers/message/message';
import { UserProvider } from '../../providers/user/user';
import { RoleProvider } from '../../providers/role/role';

import { User } from '../../models/user.model';
import { Role } from '../../models/role.model';


@IonicPage()
@Component({
  selector: 'page-user-form',
  templateUrl: 'user-form.html',
})
export class UserFormPage extends BasePage {

  private RELOAD_PAGE: string = 'UserPage';

  private DATA: string = 'user';

  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  form: FormGroup;

  user: User;

  roles: Role[];

  passwordNotMatch: string;

  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public events: Events,
    public translateService: TranslateService,
    public settingProvider: SettingProvider,
    public messageProvider: MessageProvider,
    public roleProvider: RoleProvider,
    public userProvider: UserProvider,
    public camera: Camera,
    public formBuilder: FormBuilder) {

    super(storage, events, translateService, settingProvider, messageProvider);
    this.init();
  }
  
  private init(): void {
    this.user = this.navParams.get(this.DATA);

    if (this.user === undefined) {
      this.reloadPage('UserPage');
    } else {
      this.initRoles();
      this.initForm();

      this.form.valueChanges.subscribe((v) => {
        this.isReadyToSave = this.form.valid;
      });
    }

    this.translateService.get('MESSAGE.PASSWORD_NOT_MATCH').subscribe(value => {
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
      this.messageProvider.showAddToast(result.username);
    });
  }

  save() {
    if (!this.form.valid) {
      return;
    } else if (this.form.value.password !== this.form.value.passwordConfirm) {
      this.messageProvider.showToast(this.passwordNotMatch);
    } else {
      this.messageProvider.showAddConfirm(this.form.value.username, (user) => this.saveCallback(this.form.value));
    }
  }
}
