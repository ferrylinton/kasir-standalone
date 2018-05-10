import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoleAddPage } from './role-add';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RoleAddPage,
  ],
  imports: [
    IonicPageModule.forChild(RoleAddPage),
    TranslateModule.forChild()
  ],
})
export class RoleAddPageModule {}
