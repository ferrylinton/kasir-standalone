import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryEditPage } from './category-edit';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CategoryEditPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryEditPage),
    TranslateModule.forChild()
  ],
})
export class CategoryEditPageModule {}
