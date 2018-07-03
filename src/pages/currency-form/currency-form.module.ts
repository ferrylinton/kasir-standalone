import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrencyFormPage } from './currency-form';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CurrencyFormPage,
  ],
  imports: [
    IonicPageModule.forChild(CurrencyFormPage),
    TranslateModule.forChild()
  ],
})
export class CurrencyFormPageModule {}
