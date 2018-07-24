import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { v4 as uuid } from 'uuid';

import { MessageProvider } from '../../providers/message/message';
import { UserProvider } from '../../providers/user/user';
import { RoleProvider } from '../../providers/role/role';

import { User } from '../../models/user.model';
import { Role } from '../../models/role.model';
import { PAGE } from '../../constant/constant';
import { OpenPGPProvider } from '../../providers/openpgp/openpgp';


@IonicPage()
@Component({
  selector: 'page-user-form',
  templateUrl: 'user-form.html',
})
export class UserFormPage{


  @ViewChild('fileInput') fileInput;

  isCreate: boolean;

  isReadyToSave: boolean;

  form: FormGroup;

  user: User;

  roleId: string;

  roles: Array<Role>;

  status: Array<{ label: string, value: boolean }>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public events: Events,
    public camera: Camera,
    public messageProvider: MessageProvider,
    public roleProvider: RoleProvider,
    public userProvider: UserProvider,
    public openPGPProvider: OpenPGPProvider,
    public formBuilder: FormBuilder) {
  }

  ionViewWillEnter() {
    this.init();
  }
  
  private init(): void {
    this.user = this.navParams.get('user');

    if (this.user === undefined) {
      this.events.publish(PAGE, { page: 'UserPage', params: {} });
    } else {
      this.initVariable();
      this.initRoles();
      this.initStatus();
    }
  }

  private initVariable(): void {
    this.isCreate = this.user.id === '';

    if (this.isCreate) {
      this.user.activated = true;
    }
  }

  private initRoles(): void {
    this.roleProvider.findAll().subscribe(roles => {
      this.roles = roles;

      if(this.isCreate && roles.length > 0){
        this.roleId = roles[0].id;
      }else{
        this.roleId = (typeof this.user.role === 'string') ? this.user.role : this.user.role.id;
      }

      this.initForm();
    })
  }

  private initStatus(): void {
    this.status = [
      { label: 'ACTIVATED', value: true },
      { label: 'DEACTIVATED', value: false }
    ];
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      username: [this.user.username, Validators.required],
      fullname: [this.user.fullname, Validators.required],
      password: [this.user.password, Validators.required],
      passwordConfirm: [this.user.password, Validators.required],
      role: [this.roleId, Validators.required],
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
      this.messageProvider.toastPasswordNotConfirmed();
    } else {
      this.messageProvider.confirmSave(() => this.saveCallback(this.form.value));
    }
  }

  private saveCallback(user: User): void {
    let cloneUser: User = JSON.parse(JSON.stringify(user));
    this.openPGPProvider.encryptWithPassword(cloneUser.password).then(encryptedPassword => {
      cloneUser.password = encryptedPassword;

      if (this.isCreate) {
        this.create(cloneUser);
      } else {
        this.modify(cloneUser);
      }
    }).catch(error => {
      this.messageProvider.toast('Error : ' + error);
    });
  }

  create(user: User): void {
    user.id = uuid();
    this.userProvider.save(user).subscribe(result => {
      this.showMessage();
    }, (error) => {
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
    }
  }

  getImageStyle() {
    return 'url(' + this.form.controls['image'].value + ')'
  }

}
