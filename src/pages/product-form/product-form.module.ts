import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductFormPage } from './product-form';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ProductFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductFormPage),
    TranslateModule.forChild(),
    PipesModule,
  ],
})
export class ProductFormPageModule {}
