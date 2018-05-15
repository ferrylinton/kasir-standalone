import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductAddPage } from './product-add';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProductAddPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductAddPage),
    TranslateModule.forChild()
  ],
})
export class ProductAddPageModule {}
