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
import { ProductProvider } from '../../providers/product/product';

import { Product } from '../../models/product.model';

@IonicPage()
@Component({
  selector: 'page-product-form',
  templateUrl: 'product-form.html',
})
export class ProductFormPage extends BasePage {

  private RELOAD_PAGE: string = 'ProductPage';

  private DATA: string = 'product';

  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  form: FormGroup;

  product: Product;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public events: Events,
    public translateService: TranslateService,
    public settingProvider: SettingProvider,
    public messageProvider: MessageProvider,
    public productProvider: ProductProvider,
    public camera: Camera,
    public formBuilder: FormBuilder) {

    super(storage, events, translateService, settingProvider, messageProvider);
    this.init();
  }

  private init(): void {
    this.product = this.navParams.get(this.DATA);

    if (this.product === undefined) {
      this.reloadPage(this.RELOAD_PAGE);
    } else {
      this.initForm();

      this.form.valueChanges.subscribe((v) => {
        this.isReadyToSave = this.form.valid;
      });
    }
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: [this.product.name, Validators.required],
      description: [this.product.description, Validators.required],
      image: [this.product.image, Validators.required]
    });

  }

  save() {
    if (!this.form.valid) {
      return;
    } else {
      this.messageProvider.showAddConfirm(this.form.value.name, (category) => this.saveCallback(this.form.value));
    }
  }

  private saveCallback(product: Product): void {
    if (this.product.id === '') {
      product.id = uuid();
      this.create(product);
    } else {
      product.id = this.product.id;
      this.modify(product);
    }
  }

  private create(product: Product): void {
    product.createdBy = this.loggedUser.username;
    product.createdDate = new Date();
    this.productProvider.save(product).subscribe(result => {
      this.navCtrl.popToRoot();
      this.messageProvider.showAddToast(result.name);
    });
  }

  private modify(product: Product): void {
    product.createdBy = this.product.createdBy;
    product.createdDate = this.product.createdDate;
    product.lastModifiedBy = this.loggedUser.username;
    product.lastModifiedDate = new Date();
    this.productProvider.update(product).subscribe(result => {
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
