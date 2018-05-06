import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryFormPage } from './category-form';

@NgModule({
  declarations: [
    CategoryFormPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryFormPage),
  ],
})
export class CategoryFormPageModule {}
