import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


import { TranslateService } from '@ngx-translate/core';
import { SettingProvider } from '../../providers/setting/setting';
import { MessageProvider } from '../../providers/message/message';
import { CategoryProvider } from '../../providers/category/category';

import { BaseListPage } from '../base/base-list';
import { Category } from '../../models/category.model';


@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage extends BaseListPage<Category>{

  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public events: Events,
    public translateService: TranslateService,
    public settingProvider: SettingProvider,
    public messageProvider: MessageProvider,
    public categoryProvider: CategoryProvider) {

    super(storage, events, translateService, settingProvider, messageProvider, categoryProvider, 'name');
  }

  ionViewWillEnter() {
    this.initPage();
    this.loadData();
  }

  view(category: Category) {
    this.navCtrl.push('CategoryDetailPage', { category: category });
  }

  create() {
    this.navCtrl.push('CategoryFormPage', { category: new Category('') });
  }

}
