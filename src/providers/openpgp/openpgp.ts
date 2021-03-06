import { Injectable } from '@angular/core';

import * as openpgp from 'openpgp';
import { decode, encode } from 'typescript-base64-arraybuffer';
import { PUBLIC_KEY, PRIVATE_KEY, PASSPHRASE } from '../../constant/openpgp';

@Injectable()
export class OpenPGPProvider {

  constructor() {
    openpgp.config.show_version = false;
    openpgp.config.show_comment = false;
  }

  encryptWithPassword(data: any): Promise<any> {
    let options = {
      data: data,
      passwords: [PASSPHRASE],
      armor: false
    };

    return new Promise((resolve, reject) => {
      openpgp.encrypt(options).then(ciphertext => {
        if (typeof ciphertext.message != 'string') {
          resolve(encode(ciphertext.message.packets.write()));
        }

      }).catch(error => {
        console.log(error);
        reject(error);
      });
    });
  }

  decryptWithPassword(message: any): Promise<any> {
    let options = {
      message: openpgp.message.read(decode(message)),
      format: 'utf8',
      password: PASSPHRASE
    };

    return new Promise((resolve, reject) => {
      openpgp.decrypt(options).then(plaintext => {
        resolve(plaintext.data);
      }).catch(error => {
        reject(error);
      });
    });
  }

  encrypt(data: string): Promise<string> {
    let publicKey = openpgp.key.readArmored(PUBLIC_KEY);
    var options = {
      data: data,
      publicKeys: publicKey.keys,
      armor: true
    };

    return new Promise((resolve, reject) => {
      openpgp.encrypt(options).then(function (encryptedData) {
        resolve(encryptedData.data);
      }).catch(error => {
        reject(error);
      });
    });
  }

  decrypt(message: string): Promise<any> {
    var key = openpgp.key.readArmored(PRIVATE_KEY).keys[0];
    key.decrypt(PASSPHRASE);
    var options = {
      message: openpgp.message.readArmored(message),
      privateKey: key
    };

    return new Promise((resolve, reject) => {
      openpgp.decrypt(options).then(function (decryptedMessage) {
        resolve(decryptedMessage.data);
      }).catch(error => {
        reject(error);
      });
    });
  }

}
