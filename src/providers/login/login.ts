import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserProvider } from '../user/user';
import { User } from '../../models/user.model';
import { PgpProvider } from '../pgp/pgp';


@Injectable()
export class LoginProvider {

  constructor(
    public userProvider: UserProvider,
    public pgpProvider: PgpProvider
  ) {

    pgpProvider.encryptWithPassword('password').subscribe(encrypted => {
      console.log("result 1 : " + encrypted);

      pgpProvider.decryptWithPassword(encrypted).subscribe(plaintext => {
        console.log("result 2 : " + plaintext);
      });
    });
    

  }

  login(username: string, password: string): Observable<User> {
    return this.userProvider.findByUsername(username);
  }

}
