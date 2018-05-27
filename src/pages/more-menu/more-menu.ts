import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { MoreMenu } from '../../models/more-menu.model';


@Component({
    template: `
    <ion-list>
      <button ion-item no-lines *ngFor="let menu of menus" (click)="close(menu.value)">
        <ion-icon item-start name="{{menu.icon}}"></ion-icon>
        <ion-label>{{menu.label}}</ion-label>
       </button>
    </ion-list>
  `
})
export class MoreMenuPage {

    menus: Array<MoreMenu>;

    constructor(
        public viewCtrl: ViewController,
        public params: NavParams
    ) {
        console.log(JSON.stringify(params));
        this.menus = params.get('menus');
    }

    close(val: string) {
        this.viewCtrl.dismiss(val);
    }
    
}