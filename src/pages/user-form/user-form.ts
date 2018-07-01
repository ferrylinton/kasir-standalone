import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
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

  isCreate: boolean;

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
      this.reloadPage(this.RELOAD_PAGE);
    } else {
      this.initVariable();
      this.initRoles();
      this.initForm();
    }
  }

  private initVariable(): void {
    this.isCreate = this.user.id === '';

    this.translateService.get('MESSAGE.PASSWORD_NOT_MATCH').subscribe(value => {
      this.passwordNotMatch = value;
    });
  }

  private initRoles(): void {
    this.roleProvider.findAll().subscribe(roles => {
      this.roles = roles;

      if(this.isCreate && roles.length > 0){
        this.user.role = this.roles[0].name;
      }
    })
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      username: [this.user.username, Validators.required],
      fullname: [this.user.fullname, Validators.required],
      password: [this.user.password, Validators.required],
      passwordConfirm: [this.user.password, Validators.required],
      role: [this.user.role, Validators.required],
      activated: [this.user.activated],
      image: [this.user.image, Validators.required]
    });

    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  save() {
    if (!this.form.valid) {
      return;
    } else if (this.form.value.password !== this.form.value.passwordConfirm) {
      this.messageProvider.showToast(this.passwordNotMatch);
    } else {
      this.messageProvider.showSaveConfirm(this.isCreate, this.form.value.name, (category) => this.saveCallback(this.form.value));
    }
  }

  private saveCallback(user: User): void {
    if (this.isCreate) {
      this.create(user);
    } else {
      this.modify(user);
    }
  }

  create(user: User): void {
    user.id = uuid();
    user.activated = true;
    user.createdBy = this.loggedUser.username;
    user.createdDate = new Date();
    this.userProvider.save(user).subscribe(result => {
      this.showSaveResult(result);
    });
  }

  modify(user: User): void {
    user.id = this.user.id;
    user.createdBy = this.user.username;
    user.createdDate = this.user.createdDate;
    user.lastModifiedBy = this.loggedUser.username;
    user.lastModifiedDate = new Date();
    this.userProvider.update(user).subscribe(result => {
      this.showSaveResult(result);
    });
  }
  
  private showSaveResult(user: User): void{
    this.navCtrl.popToRoot();
    this.messageProvider.showSaveToast(this.isCreate, user.fullname);
  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({ 'image': 'data:image/png;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    if (event.target.files.length != 0) {
      let reader = new FileReader();
      reader.onload = (readerEvent) => {
        let imageData = (readerEvent.target as any).result;
        this.form.patchValue({ 'image': imageData });
      };

      reader.readAsDataURL(event.target.files[0]);
    } else {
      console.log('cancel...................');
    }

  }

  getImageStyle() {
    return 'url(' + this.form.controls['image'].value + ')'
  }

}
