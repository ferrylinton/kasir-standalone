import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryAddPage } from './category-add';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CategoryAddPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryAddPage),
    TranslateModule.forChild()
  ],
})
export class CategoryAddPageModule {}
