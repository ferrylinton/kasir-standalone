import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { MessageProvider } from '../message/message';

import { LOGGED_USER, PAGE } from "../../constant/constant";
import { User } from "../../models/user.model";
import { Order } from '../../models/order.model';
import { Product } from '../../models/product.model';


@Injectable()
export class CommonProvider {

  private MESSAGE_RELOAD_PAGE: string = 'RELOAD_PAGE';

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
  
  getProductFromOrder(order: Order): string{
    let result = '';

    if(order){
      for(let i=0; i<order.items.length; i++){
        let product: Product = order.items[i].product;
        result += i==0 ? product.name: ', ' + product.name;
      }
    }
    
    return result;
  }
}
