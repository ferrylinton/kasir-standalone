import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { CategoryProvider } from '../../providers/category/category';
import { BasePage } from '../base/base';
import { Category } from '../../models/category.model';

@IonicPage()
@Component({
  selector: 'page-category-detail',
  templateUrl: 'category-detail.html',
})
export class CategoryDetailPage extends BasePage {

  private category: Category;

  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public translate: TranslateService,
    public storage: Storage,
    public events: Events,
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoryProvider: CategoryProvider) {

    super(toastCtrl, alertCtrl, translate, storage, events);
    this.init(navParams);
  }

  private init(navParams: NavParams): void {
    this.category = navParams.get('category');

    if (this.category === undefined) {
      this.reloadPage('CategoryPage');
    }
  }

  edit() {
    this.navCtrl.push('CategoryEditPage', {
      category: this.category
    });
  }

  deleteCallback(category: Category): void {
    this.categoryProvider.delete(category.id).subscribe(result => {
      this.navCtrl.popToRoot();
      this.showDeleteToast(result.name);
    });
  }

  delete() {
    this.showDeleteConfirm(this.category.name, (category) => this.deleteCallback(this.category));
  }

}
