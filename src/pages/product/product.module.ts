import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductPage } from './product';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ProductPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductPage),
    TranslateModule.forChild(),
    PipesModule,
  ],
})
export class ProductPageModule {}
