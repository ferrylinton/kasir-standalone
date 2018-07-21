import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileFormPage } from './profile-form';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProfileFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileFormPage),
    TranslateModule.forChild()
  ],
})
export class ProfileFormPageModule {}
