import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrencyDetailPage } from './currency-detail';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    CurrencyDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CurrencyDetailPage),
    TranslateModule.forChild(),
    PipesModule,
  ],
})
export class CurrencyDetailPageModule {}
