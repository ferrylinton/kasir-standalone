import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserProvider } from '../user/user';
import { User } from '../../models/user.model';

import * as openpgp from 'openpgp';
import { PUBLIC_KEY, PRIVATE_KEY, PASSPHRASE } from '../../constant/openpgp';


@Injectable()
export class LoginProvider {

  constructor(
    public userProvider: UserProvider) {

    openpgp.config.show_version = false;
    openpgp.config.show_comment = false;

    let encryptedMessage;
    let publicKey = openpgp.key.readArmored(PUBLIC_KEY);

    var options1 = {
      data: 'This is a very secret message',
      publicKeys: publicKey.keys,
      armor: true
    };

    openpgp.encrypt(options1).then(encryptedData => {
      encryptedMessage = encryptedData.data;
      console.log(encryptedData.data);


      var key = openpgp.key.readArmored(PRIVATE_KEY).keys[0];
      key.decrypt(PASSPHRASE);
      var options2 = {
        message: openpgp.message.readArmored(encryptedMessage),
        privateKey: key
      };

      openpgp.decrypt(options2).then(decryptedMessage => {
        console.log(decryptedMessage.data);
      });
    });



  }

  login(username: string, password: string): Observable<User> {
    return this.userProvider.findByUsername(username);
  }

}
