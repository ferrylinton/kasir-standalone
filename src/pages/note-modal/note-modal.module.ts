import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoteModalPage } from './note-modal';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    NoteModalPage,
  ],
  imports: [
    IonicPageModule.forChild(NoteModalPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class NoteModalPageModule {}
