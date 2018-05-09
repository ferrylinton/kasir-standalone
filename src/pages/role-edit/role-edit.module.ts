import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoleEditPage } from './role-edit';

@NgModule({
  declarations: [
    RoleEditPage,
  ],
  imports: [
    IonicPageModule.forChild(RoleEditPage),
  ],
})
export class RoleEditPageModule {}
