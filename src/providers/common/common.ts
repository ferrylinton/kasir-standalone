import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { MessageProvider } from '../message/message';

import { LOGGED_USER, PAGE } from "../../constant/constant";
import { User } from "../../models/user.model";


@Injectable()
export class CommonProvider {

  private MESSAGE_RELOAD_PAGE: string = 'MESSAGE.RELOAD_PAGE';

  private reloadTxt: string = 'Reload page';

  constructor(
    public translate: TranslateService,
    public storage: Storage,
    public events: Events,
    public messageProvider: MessageProvider) {

    this.translate.get([this.MESSAGE_RELOAD_PAGE]).subscribe(values => {
      this.reloadTxt = values[this.MESSAGE_RELOAD_PAGE];
    });
  }

  getLoggedUser(): Observable<User> {
    return fromPromise(this.storage.get(LOGGED_USER).then((val) => {
      return JSON.parse(val);
    }))
  }

  goToPage(page: string, params: any): void {
    this.events.publish(PAGE, { page: page, params: params });
  }

  reloadPage(page: string): void {
    this.messageProvider.showToast(this.reloadTxt);
    this.events.publish(PAGE, { page: page, params: {} });
  }
  
}
