import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoleAddPage } from './role-add';

@NgModule({
  declarations: [
    RoleAddPage,
  ],
  imports: [
    IonicPageModule.forChild(RoleAddPage),
  ],
})
export class RoleAddPageModule {}
