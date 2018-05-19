import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { BasePage } from '../base/base';
import { ProductProvider } from '../../providers/product/product';

import { Product } from '../../models/product.model';


@IonicPage()
@Component({
  selector: 'page-product-edit',
  templateUrl: 'product-edit.html',
})
export class ProductEditPage extends BasePage {

  isReadyToSave: boolean;

  form: FormGroup;

  product: Product;

  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public translate: TranslateService,
    public storage: Storage,
    public events: Events,
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public productProvider: ProductProvider) {

    super(toastCtrl, alertCtrl, translate, storage, events);
    this.init(navParams);
  }

  private init(navParams: NavParams): void {
    this.product = navParams.get('product');

    if (this.product === undefined) {
      this.reloadPage('ProductPage');
    } else {
      this.initForm();

      this.form.valueChanges.subscribe((v) => {
        this.isReadyToSave = this.form.valid;
      });
    }
  }


  private initForm(): void {
    this.form = this.formBuilder.group({
      id: [this.product.id],
      name: [this.product.name, Validators.required],
      description: [this.product.description]
    });
  }


  saveCallback(product: Product): void {
    product.createdBy = this.product.createdBy;
    product.createdDate = this.product.createdDate;
    product.lastModifiedBy = this.loggedUser.username;
    product.lastModifiedDate = new Date();
    this.productProvider.update(product).subscribe(result => {
      this.navCtrl.popToRoot();
      this.showEditToast(result.name);
    });
  }

  save() {
    if (!this.form.valid) {
      return;
    } else {
      this.showEditConfirm(this.form.value.name, (product) => this.saveCallback(this.form.value));
    }
  }

}
