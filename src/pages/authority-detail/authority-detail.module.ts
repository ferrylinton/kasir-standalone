import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthorityDetailPage } from './authority-detail';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AuthorityDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthorityDetailPage),
    TranslateModule.forChild()
  ],
})
export class AuthorityDetailPageModule {}
