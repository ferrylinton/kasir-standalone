import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { v4 as uuid } from 'uuid';

import { CategoryProvider } from '../../providers/category/category';

import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';
import { Category } from '../../models/category.model';

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  pageable: Pageable;

  page: Page<Category>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoryProvider: CategoryProvider) {

    this.init();
  }

  ionViewWillEnter() {
    this.init();
  }

  private init(): void {
    this.pageable = new Pageable(1);
    this.loadData(this.pageable);
  }

  private loadData(pageable: Pageable) {
    this.categoryProvider.find(pageable).subscribe(page => {
      this.page = page;
    })
  }

  previous(): void {
    if (this.pageable.pageNumber > 1) {
      this.pageable = new Pageable(this.page.pageNumber - 1, this.page.totalData);
      this.loadData(this.pageable);
    }
  }

  next(): void {
    if (this.pageable.pageNumber < this.page.getTotalPage()) {
      this.pageable = new Pageable(this.page.pageNumber + 1, this.page.totalData);
      this.loadData(this.pageable);
    }
  }

  view(category: Category) {
    this.navCtrl.push('CategoryDetailPage', {
      category: category
    });
  }

  add() {
    let category = new Category(uuid());
    
    this.navCtrl.push('CategoryAddPage', {
      category: category
    });
  }

}
