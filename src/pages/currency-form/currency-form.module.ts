import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrencyFormPage } from './currency-form';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CurrencyFormPage,
  ],
  imports: [
    IonicPageModule.forChild(CurrencyFormPage),
    TranslateModule.forChild(),
    PipesModule,
    ComponentsModule
  ],
})
export class CurrencyFormPageModule {}
