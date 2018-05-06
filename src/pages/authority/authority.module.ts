import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthorityPage } from './authority';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AuthorityPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthorityPage),
    TranslateModule.forChild()
  ],
})
export class AuthorityPageModule {}
