import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderModalPage } from './order-modal';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    OrderModalPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderModalPage),
    TranslateModule.forChild(),
    PipesModule,
    ComponentsModule
  ],
})
export class OrderModalPageModule {}
