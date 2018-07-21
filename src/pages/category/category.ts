import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

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
    public translate: TranslateService,
    public messageProvider: MessageProvider,
    public categoryProvider: CategoryProvider
  ) {
    super(translate);
  }

  ionViewWillEnter() {
    this.initPage();
    this.loadData();
  }

  loadData() {
    this.categoryProvider.findByName(this.keyword, this.page).subscribe(page => {
      this.setPage(page);
    }, (error) => {
      this.message = 'Error : ' + error;
    });
  }

  view(category: Category) {
    this.navCtrl.push('CategoryDetailPage', { category: category });
  }

  create() {
    this.navCtrl.push('CategoryFormPage', { category: new Category() });
  }

}
