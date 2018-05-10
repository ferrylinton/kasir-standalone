import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoleDetailPage } from './role-detail';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RoleDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(RoleDetailPage),
    TranslateModule.forChild()
  ],
})
export class RoleDetailPageModule {}
