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
  selector: 'page-product-add',
  templateUrl: 'product-add.html',
})
export class ProductAddPage extends BasePage {

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
    product.createdBy = this.loggedUser.username;
    product.createdDate = new Date();
    this.productProvider.save(product).subscribe(result => {
      this.navCtrl.popToRoot();
      this.showAddToast(result.name);
    });
  }

  save() {
    if (!this.form.valid) {
      return;
    } else {
      this.showAddConfirm(this.form.value.name, (product) => this.saveCallback(this.form.value));
    }
  }

}

