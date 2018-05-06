import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DatabasePage } from './database';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DatabasePage,
  ],
  imports: [
    IonicPageModule.forChild(DatabasePage),
    TranslateModule.forChild()
  ],
})
export class DatabasePageModule {}
