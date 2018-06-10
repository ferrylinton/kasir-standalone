import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductModalPage } from './product-modal';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProductModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductModalPage),
    TranslateModule.forChild()
  ],
})
export class ProductModalPageModule {}
