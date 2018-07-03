import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrencyPage } from './currency';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CurrencyPage,
  ],
  imports: [
    IonicPageModule.forChild(CurrencyPage),
    TranslateModule.forChild()
  ],
})
export class CurrencyPageModule {}
