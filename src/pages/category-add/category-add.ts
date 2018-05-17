import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { BasePage } from '../base/base';
import { CategoryProvider } from '../../providers/category/category';

import { Category } from '../../models/category.model';


@IonicPage()
@Component({
  selector: 'page-category-add',
  templateUrl: 'category-add.html',
})
export class CategoryAddPage extends BasePage {

  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  form: FormGroup;

  category: Category;

  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public translate: TranslateService,
    public storage: Storage,
    public events: Events,
    public camera: Camera,
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public categoryProvider: CategoryProvider) {

    super(toastCtrl, alertCtrl, translate, storage, events);
    this.init(navParams);
  }

  private init(navParams: NavParams): void {
    this.category = navParams.get('category');

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
      id: [this.category.id],
      name: [this.category.name, Validators.required],
      description: [this.category.description, Validators.required],
      image: [this.category.image, Validators.required]
    });

  }

  saveCallback(category: Category): void {
    category.createdBy = this.loggedUser.username;
    category.createdDate = new Date();
    this.categoryProvider.save(category).subscribe(result => {
      this.navCtrl.popToRoot();
      this.showAddToast(result.name);
    });
  }

  save() {
    if (!this.form.valid) {
      return;
    } else {
      this.showAddConfirm(this.form.value.name, (category) => this.saveCallback(this.form.value));
    }
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
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'image': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getImageStyle() {
    return 'url(' + this.form.controls['image'].value + ')'
  }

}

