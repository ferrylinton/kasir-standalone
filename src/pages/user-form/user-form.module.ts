import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserFormPage } from './user-form';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    UserFormPage,
  ],
  imports: [
    IonicPageModule.forChild(UserFormPage),
    TranslateModule.forChild()
  ],
})
export class UserFormPageModule {}
