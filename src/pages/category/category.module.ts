import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryPage } from './category';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryPage),
    TranslateModule.forChild()
  ],
})
export class CategoryPageModule {}
