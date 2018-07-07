import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductDetailPage } from './product-detail';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ProductDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductDetailPage),
    TranslateModule.forChild(),
    PipesModule,
  ],
})
export class ProductDetailPageModule {}
