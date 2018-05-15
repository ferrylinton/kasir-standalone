import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserAddPage } from './user-add';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    UserAddPage,
  ],
  imports: [
    IonicPageModule.forChild(UserAddPage),
    TranslateModule.forChild()
  ],
})
export class UserAddPageModule {}
