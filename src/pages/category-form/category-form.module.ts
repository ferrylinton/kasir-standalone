import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryFormPage } from './category-form';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    CategoryFormPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryFormPage),
    TranslateModule.forChild(),
    PipesModule,
  ],
})
export class CategoryAddPageModule {}
