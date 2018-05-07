import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoleFormPage } from './role-form';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RoleFormPage,
  ],
  imports: [
    IonicPageModule.forChild(RoleFormPage),
    TranslateModule.forChild()
  ],
})
export class RoleFormPageModule {}
