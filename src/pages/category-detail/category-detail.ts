import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { SettingProvider } from '../../providers/setting/setting';
import { MessageProvider } from '../../providers/message/message';
import { CategoryProvider } from '../../providers/category/category';
import { BasePage } from '../base/base';
import { Category } from '../../models/category.model';



@IonicPage()
@Component({
  selector: 'page-category-detail',
  templateUrl: 'category-detail.html',
})
export class CategoryDetailPage extends BasePage {

  private RELOAD_PAGE: string = 'CategoryPage';

  private FORM_PAGE: string = 'CategoryFormPage';

  private DATA: string = 'category';
  
  category: Category;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public events: Events,
    public translateService: TranslateService,
    public settingProvider: SettingProvider,
    public messageProvider: MessageProvider,
    public categoryProvider: CategoryProvider) {

    super(storage, events, translateService, settingProvider, messageProvider);
    this.init();
  }

  private init(): void {
    this.category = this.navParams.get(this.DATA);

    if (this.category === undefined) {
      this.reloadPage(this.RELOAD_PAGE);
    }
  }

  modify() {
    this.navCtrl.push(this.FORM_PAGE, { category: this.category });
  }

  deleteCallback(): void {
    this.categoryProvider.delete(this.category.id).subscribe(data => {
      this.navCtrl.popToRoot();
      this.messageProvider.showDeleteToast(this.category.name);
    });
  }

  delete() {
    this.messageProvider.showDeleteConfirm(this.category.name, (category) => this.deleteCallback());
  }

}
