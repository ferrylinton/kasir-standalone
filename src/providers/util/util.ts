
import { Injectable } from '@angular/core';


@Injectable()
export class UtilProvider {

  transactionNumber(): string{
    return new Date().valueOf() + '-' + Math.floor((Math.random() * 10000) + 10000);
  }

}
