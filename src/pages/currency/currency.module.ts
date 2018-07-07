import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrencyPage } from './currency';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    CurrencyPage,
  ],
  imports: [
    IonicPageModule.forChild(CurrencyPage),
    TranslateModule.forChild(),
    PipesModule,
  ],
})
export class CurrencyPageModule {}
