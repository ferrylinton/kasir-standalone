import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductFormPage } from './product-form';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProductFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductFormPage),
    TranslateModule.forChild()
  ],
})
export class ProductFormPageModule {}
