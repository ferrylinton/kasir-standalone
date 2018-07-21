import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductFormPage } from './product-form';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ProductFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductFormPage),
    TranslateModule.forChild(),
    PipesModule,
    ComponentsModule
  ],
})
export class ProductFormPageModule {}
