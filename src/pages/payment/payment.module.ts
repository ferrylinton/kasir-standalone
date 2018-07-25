import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentPage } from './payment';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentPage),
    TranslateModule.forChild(),
    PipesModule,
    ComponentsModule
  ],
})
export class PaymentPageModule {}
