import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-note-modal',
  templateUrl: 'note-modal.html',
})
export class NoteModalPage {

  note: string;

  constructor(public viewCtrl: ViewController) {
  }

}
