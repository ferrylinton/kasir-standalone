import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';

import { MessageProvider } from '../../providers/message/message';
import { UserProvider } from '../../providers/user/user';

import { User } from '../../models/user.model';
import { PAGE } from '../../constant/constant';


@IonicPage()
@Component({
  selector: 'page-profile-form',
  templateUrl: 'profile-form.html',
})
export class ProfileFormPage {

  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  form: FormGroup;

  user: User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public events: Events,
    public camera: Camera,
    public messageProvider: MessageProvider,
    public userProvider: UserProvider,
    public formBuilder: FormBuilder) {
  }

  ionViewWillEnter() {
    this.init();
  }

  private init(): void {
    this.user = this.navParams.get('user');

    if (!this.user) {
      this.events.publish(PAGE, { page: 'ProfilePage', params: {} });
    } else {
      this.initForm();
    }
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      username: [this.user.username, Validators.required],
      fullname: [this.user.fullname, Validators.required],
      image: [this.user.image, Validators.required]
    });

    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  save() {
    if (!this.form.valid) {
      return;
    } else {
      this.messageProvider.confirmSave(() => this.saveCallback(this.form.value));
    }
  }

  private saveCallback(user: User): void {
    console.log(user.fullname);
    console.log(user.username);
    // user.id = this.user.id;
    // this.userProvider.update(user).subscribe(result => {
    //   this.showMessage();
    // }, (error) => {
    //   this.messageProvider.toast('Error : ' + error);
    // });
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
