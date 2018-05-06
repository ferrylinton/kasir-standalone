import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderHistoryPage } from './order-history';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    OrderHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderHistoryPage),
    TranslateModule.forChild()
  ],
})
export class OrderHistoryPageModule {}
