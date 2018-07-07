import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingPage } from './setting';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    SettingPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingPage),
    TranslateModule.forChild(),
    PipesModule,
  ],
})
export class SettingPageModule {}
