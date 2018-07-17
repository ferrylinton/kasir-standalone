import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';


@Component({
  template: `
    <ion-list class="cart-popover">
      <button ion-item (click)="viewCtrl.dismiss('save')">{{ 'SAVE' | translate }}</button>
      <button ion-item (click)="viewCtrl.dismiss('delete')">{{ 'DELETE' | translate }}</button>
    </ion-list>
  `
})
export class CartPopoverPage {

  constructor(public viewCtrl: ViewController) { }

}