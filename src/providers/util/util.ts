
import { Injectable } from '@angular/core';
import { Base } from '../../models/base.model';
import { Sort } from '../../models/sort.model';


@Injectable()
export class UtilProvider {

  transactionNumber(): string {
    return new Date().valueOf() + '-' + Math.floor((Math.random() * 10000) + 10000);
  }

  randomString(length: number): string{
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  randomNumber(start: number, end:number): number{
    return Math.floor(Math.random() * end) + start;
  }

}
