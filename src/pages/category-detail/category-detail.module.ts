import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryDetailPage } from './category-detail';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CategoryDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryDetailPage),
    TranslateModule.forChild(),
    PipesModule,
    ComponentsModule
  ],
})
export class CategoryDetailPageModule {}
