import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { PAGE } from '../../constant/constant';
import { MessageProvider } from '../../providers/message/message';
import { UserProvider } from '../../providers/user/user';
import { CategoryProvider } from '../../providers/category/category';
import { Category } from '../../models/category.model';


@IonicPage()
@Component({
  selector: 'page-category-detail',
  templateUrl: 'category-detail.html',
})
export class CategoryDetailPage {

  category: Category;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public messageProvider: MessageProvider,
    public userProvider: UserProvider,
    public categoryProvider: CategoryProvider) {
  }

  ionViewWillEnter() {
    this.init();
  }

  private init(): void {
    this.category = this.navParams.get('category');

    if (!this.category) {
      this.events.publish(PAGE, { page: 'CategoryPage', params: {} });
    } else {
      forkJoin([this.userProvider.findById(this.category.createdBy), this.userProvider.findById(this.category.lastModifiedBy)])
      .subscribe(results => {
        this.category.createdBy = results[0];
        this.category.lastModifiedBy = results[1];
      });
    }
  }

  modify() {
    this.navCtrl.push('CategoryFormPage', { category: this.category });
  }

  deleteCallback(): void {
    this.categoryProvider.delete(this.category.id).subscribe(data => {
      this.navCtrl.popToRoot();
      this.messageProvider.toastDelete();
    }, error => {
      this.messageProvider.toast('Error : ' + error);
    });
  }

  delete() {
    this.messageProvider.confirmDelete(() => this.deleteCallback());
  }

}
