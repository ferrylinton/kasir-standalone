import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

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
    public messageProvider: MessageProvider,
    public categoryProvider: CategoryProvider
  ) {
    super();
  }

  ionViewWillEnter() {
    this.initPage();
    this.loadData();
  }

  loadData() {
    this.categoryProvider.findByName(this.keyword, this.page).subscribe(page => {
      this.page.pageNumber = page.pageNumber;
      this.page.totalData = page.totalData;
      this.page.data = [...this.page.data, ...page.data];
    }, (error) => {
      this.messageProvider.toast('Error : ' + error);
    })
  }

  view(category: Category) {
    this.navCtrl.push(this.DETAIL_PAGE, { category: category });
  }

  create() {
    this.navCtrl.push(this.FORM_PAGE, { category: new Category('') });
  }

}
