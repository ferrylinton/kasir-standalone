import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserFormPage } from './user-form';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    UserFormPage,
  ],
  imports: [
    IonicPageModule.forChild(UserFormPage),
    TranslateModule.forChild(),
    PipesModule,
    ComponentsModule
  ],
})
export class UserFormPageModule {}
