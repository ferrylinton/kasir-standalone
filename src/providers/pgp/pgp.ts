import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import * as openpgp from 'openpgp';
import { PUBLIC_KEY, PRIVATE_KEY, PASSPHRASE } from '../../constant/openpgp';

@Injectable()
export class PgpProvider {

  private PASSWORD: string = '8add6acf-1eaa-4c66-9a89-ba98cf17511e';

  private b64s: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

  constructor() {
    openpgp.config.show_version = false;
    openpgp.config.show_comment = false;
  }

  encryptWithPassword(data: any): Observable<any> {
    let options = {
      data: data,
      passwords: [this.PASSWORD],
      armor: false
    };

    return new Observable(observer => {
      openpgp.encrypt(options).then(ciphertext => {
        let result = ciphertext.message.packets.write();
        observer.next(this.s2r(result, ''));
        observer.complete();
      });
    });
  }

  decryptWithPassword(message: any): Observable<any> {
    let options = {
      message: openpgp.message.read(this.r2s(message)),
      format: 'utf8',
      password: this.PASSWORD
    };

    return new Observable(observer => {
      openpgp.decrypt(options).then(plaintext => {
        if (typeof plaintext.data !== 'string') {
          observer.next(new TextDecoder("utf-8").decode(plaintext.data));
        } else {
          observer.next(plaintext.data);
        }

        observer.complete();
      });
    });
  }

  encrypt(data: string): Observable<string> {
    let publicKey = openpgp.key.readArmored(PUBLIC_KEY);
    var options = {
      data: data,
      publicKeys: publicKey.keys,
      armor: true
    };

    return new Observable(observer => {
      openpgp.encrypt(options).then(function (encryptedData) {
        observer.next(encryptedData.data);
        observer.complete();
      });
    });
  }

  decrypt(message: string): Observable<any> {
    var key = openpgp.key.readArmored(PRIVATE_KEY).keys[0];
    key.decrypt(PASSPHRASE);
    var options = {
      message: openpgp.message.readArmored(message),
      privateKey: key
    };

    return new Observable(observer => {
      openpgp.decrypt(options).then(function (decryptedMessage) {
        observer.next(decryptedMessage.data);
        observer.complete();
      });
    });
  }



  /**

   * Convert binary array to radix-64

   * @param {Uint8Array} t Uint8Array to convert

   * @returns {string} radix-64 version of input string

   * @static

   */

  s2r(t: any, o: any) {

    // TODO check btoa alternative

    var a, c, n;

    var r = o ? o : [],

      l = 0,

      s = 0;

    var tl = t.length;

    for (n = 0; n < tl; n++) {

      c = t[n];

      if (s === 0) {

        r.push(this.b64s.charAt((c >> 2) & 63));

        a = (c & 3) << 4;

      } else if (s === 1) {

        r.push(this.b64s.charAt((a | (c >> 4) & 15)));

        a = (c & 15) << 2;

      } else if (s === 2) {

        r.push(this.b64s.charAt(a | ((c >> 6) & 3)));

        l += 1;

        if ((l % 60) === 0) {

          r.push("\n");

        }

        r.push(this.b64s.charAt(c & 63));

      }

      l += 1;

      if ((l % 60) === 0) {

        r.push("\n");

      }

      s += 1;

      if (s === 3) {

        s = 0;

      }

    }

    if (s > 0) {

      r.push(this.b64s.charAt(a));

      l += 1;

      if ((l % 60) === 0) {

        r.push("\n");

      }

      r.push('=');

      l += 1;

    }

    if (s === 1) {

      if ((l % 60) === 0) {

        r.push("\n");

      }

      r.push('=');

    }

    if (o) {

      return;

    }

    return r.join('');

  }

  /**

   * Convert radix-64 to binary array

   * @param {String} t radix-64 string to convert

   * @returns {Uint8Array} binary array version of input string

   * @static

   */

  r2s(t) {

    // TODO check atob alternative

    var c, n;

    var r = [],

      s = 0,

      a = 0;

    var tl = t.length;

    for (n = 0; n < tl; n++) {

      c = this.b64s.indexOf(t.charAt(n));

      if (c >= 0) {

        if (s) {

          r.push(a | (c >> (6 - s)) & 255);

        }

        s = (s + 2) & 7;

        a = (c << s) & 255;

      }

    }

    return new Uint8Array(r);

  }


}
