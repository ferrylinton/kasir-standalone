import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductEditPage } from './product-edit';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProductEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductEditPage),
    TranslateModule.forChild()
  ],
})
export class ProductEditPageModule {}
