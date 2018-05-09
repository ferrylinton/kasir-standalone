import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuAddPage } from './menu-add';

@NgModule({
  declarations: [
    MenuAddPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuAddPage),
  ],
})
export class MenuAddPageModule {}
