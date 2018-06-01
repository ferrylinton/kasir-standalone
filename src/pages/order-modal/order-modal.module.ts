import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderModalPage } from './order-modal';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    OrderModalPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderModalPage),
    TranslateModule.forChild()
  ],
})
export class OrderModalPageModule {}
