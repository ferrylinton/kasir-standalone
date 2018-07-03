import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductModalPage } from './product-modal';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ProductModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductModalPage),
    TranslateModule.forChild(),
    PipesModule,
  ],
})
export class ProductModalPageModule {}
