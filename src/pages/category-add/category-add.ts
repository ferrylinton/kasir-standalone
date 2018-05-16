import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
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

  isReadyToSave: boolean;

  form: FormGroup;

  category: Category;

  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public translate: TranslateService,
    public storage: Storage,
    public events: Events,
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
      description: [this.category.description]
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

}

