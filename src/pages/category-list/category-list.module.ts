import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryListPage } from './category-list';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CategoryListPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryListPage),
    TranslateModule.forChild()
  ],
})
export class CategoryListPageModule {}
