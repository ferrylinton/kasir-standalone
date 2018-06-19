import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { MoreMenu } from '../../models/more-menu.model';


@Component({
    template: `
    <div class="more-menu">
        <ion-list>
        <button ion-item no-lines (click)="close('reload')">
            <ion-label>{{ 'RELOAD' | translate }}</ion-label>
        </button>
        <button ion-item no-lines *ngFor="let menu of menus" (click)="close(menu.value)">
            <ion-label>{{menu.label}}</ion-label>
        </button>
        </ion-list>
    </div>
  `
})
export class MoreMenuPage {

    menus: Array<MoreMenu>;

    constructor(
        public viewCtrl: ViewController,
        public params: NavParams
    ) {
        this.menus = params.get('menus');
    }

    close(val: string) {
        this.viewCtrl.dismiss(val);
    }

}