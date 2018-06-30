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
import { CategoryProvider } from '../../providers/category/category'

import { Category } from '../../models/category.model';


@IonicPage()
@Component({
  selector: 'page-category-form',
  templateUrl: 'category-form.html',
})
export class CategoryFormPage extends BasePage {

  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  form: FormGroup;

  category: Category;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public events: Events,
    public translateService: TranslateService,
    public settingProvider: SettingProvider,
    public messageProvider: MessageProvider,
    public categoryProvider: CategoryProvider,
    public camera: Camera,
    public formBuilder: FormBuilder) {

    super(storage, events, translateService, settingProvider, messageProvider);
    this.init();
  }

  private init(): void {
    this.category = this.navParams.get('category');

    if (this.category === undefined) {
      this.reloadPage('CategoryPage');
    } else {
      this.initForm();

      this.form.valueChanges.subscribe((v) => {
        this.isReadyToSave = this.form.valid;
      });
    }
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: [this.category.name, Validators.required],
      description: [this.category.description, Validators.required],
      image: [this.category.image, Validators.required]
    });

  }

  save() {
    if (!this.form.valid) {
      return;
    } else {
      this.messageProvider.showAddConfirm(this.form.value.name, (category) => this.saveCallback(this.form.value));
    }
  }

  private saveCallback(category: Category): void {
    if (this.category.id === '') {
      category.id = uuid();
      this.create(category);
    } else {
      category.id = this.category.id;
      this.modify(category);
    }
  }

  private create(category: Category): void {
    category.createdBy = this.loggedUser.username;
    category.createdDate = new Date();
    this.categoryProvider.save(category).subscribe(result => {
      this.navCtrl.popToRoot();
      this.messageProvider.showAddToast(result.name);
    });
  }

  private modify(category: Category): void {
    category.createdBy = this.category.createdBy;
    category.createdDate = this.category.createdDate;
    category.lastModifiedBy = this.loggedUser.username;
    category.lastModifiedDate = new Date();
    this.categoryProvider.update(category).subscribe(result => {
      this.navCtrl.popToRoot();
      this.messageProvider.showEditToast(result.name);
    });
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

