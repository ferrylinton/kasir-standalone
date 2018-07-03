import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrencyDetailPage } from './currency-detail';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CurrencyDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CurrencyDetailPage),
    TranslateModule.forChild()
  ],
})
export class CurrencyDetailPageModule {}
