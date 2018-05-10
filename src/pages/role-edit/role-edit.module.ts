import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoleEditPage } from './role-edit';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RoleEditPage,
  ],
  imports: [
    IonicPageModule.forChild(RoleEditPage),
    TranslateModule.forChild()
  ],
})
export class RoleEditPageModule {}
