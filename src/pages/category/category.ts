import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { v4 as uuid } from 'uuid';

import { TranslateService } from '@ngx-translate/core';
import { CommonProvider } from '../../providers/common/common';
import { SettingProvider } from '../../providers/setting/setting';
import { CategoryProvider } from '../../providers/category/category';

import { BaseCrud } from '../base/base-crud';
import { Category } from '../../models/category.model';

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage extends BaseCrud<Category>{

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public translateService: TranslateService,
    public commonProvider: CommonProvider,
    public settingProvider: SettingProvider,
    public categoryProvider: CategoryProvider) {

    super(modalCtrl, translateService, commonProvider, settingProvider, categoryProvider, 'name');
  }

  ionViewWillEnter() {
    this.loadData();
  }

  view(category: Category) {
    this.navCtrl.push('CategoryDetailPage', { category: category });
  }

  add() {
    this.navCtrl.push('CategoryAddPage', { category: new Category(uuid()) });
  }

}
