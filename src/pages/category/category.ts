import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
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

  private DETAIL_PAGE: string = 'CategoryDetailPage';

  private FORM_PAGE: string = 'CategoryFormPage';

  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public events: Events,
    public translateService: TranslateService,
    public settingProvider: SettingProvider,
    public messageProvider: MessageProvider,
    public categoryProvider: CategoryProvider
  ) {
    super(storage, events, translateService, settingProvider, messageProvider, categoryProvider, 'name');
  }

  ionViewWillEnter() {
    this.settingProvider.getSetting().subscribe(setting => {
      this.setting = setting;
      this.initPage();
      this.loadData();
    });
    this.initLanguage();
  }

  loadData() {
    this.categoryProvider.findByName(this.keyword, this.page).subscribe(page => {
      this.page.pageNumber = page.pageNumber;
      this.page.totalData = page.totalData;
      this.page.data = [...this.page.data, ...page.data];
    })
  }

  view(category: Category) {
    this.navCtrl.push(this.DETAIL_PAGE, { category: category });
  }

  create() {
    this.navCtrl.push(this.FORM_PAGE, { category: new Category('') });
  }

}
