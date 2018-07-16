import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoteModalPage } from './note-modal';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NoteModalPage,
  ],
  imports: [
    IonicPageModule.forChild(NoteModalPage),
    TranslateModule.forChild()
  ],
})
export class NoteModalPageModule {}
