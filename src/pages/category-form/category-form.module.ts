import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryFormPage } from './category-form';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CategoryFormPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryFormPage),
    TranslateModule.forChild()
  ],
})
export class CategoryAddPageModule {}
