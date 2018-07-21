import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { v4 as uuid } from 'uuid';

import { PAGE } from '../../constant/constant';
import { MessageProvider } from '../../providers/message/message';
import { CategoryProvider } from '../../providers/category/category'
import { Category } from '../../models/category.model';


@IonicPage()
@Component({
  selector: 'page-category-form',
  templateUrl: 'category-form.html',
})
export class CategoryFormPage{

  @ViewChild('fileInput') fileInput;

  isCreate: boolean;

  isReadyToSave: boolean;

  form: FormGroup;

  category: Category;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public events: Events,
    public camera: Camera,
    public messageProvider: MessageProvider,
    public categoryProvider: CategoryProvider,
    public formBuilder: FormBuilder) {
  }

  ionViewWillEnter() {
    this.init();
  }

  private init(): void {
    this.category = this.navParams.get('category');

    if (!this.category) {
      this.events.publish(PAGE, { page: 'CategoryPage', params: {} });
    } else {
      this.initVariable();
      this.initForm();
    }
  }

  private initVariable(): void{
    this.isCreate = this.category.id === '';
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: [this.category.name, Validators.required],
      description: [this.category.description, Validators.required],
      image: [this.category.image, Validators.required]
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

  private saveCallback(category: Category): void {
    if (this.isCreate) {
      this.create(category);
    } else {
      this.modify(category);
    }
  }

  private create(category: Category): void {
    category.id = uuid();
    this.categoryProvider.save(category).subscribe(result => {
      this.showMessage();
    }, (error) => {
      this.messageProvider.toast('Error : ' + error);
    });
  }

  private modify(category: Category): void {
    category.id = this.category.id;
    this.categoryProvider.update(category).subscribe(result => {
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

