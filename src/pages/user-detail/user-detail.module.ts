import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserDetailPage } from './user-detail';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    UserDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(UserDetailPage),
    TranslateModule.forChild(),
    PipesModule,
  ],
})
export class UserDetailPageModule {}
