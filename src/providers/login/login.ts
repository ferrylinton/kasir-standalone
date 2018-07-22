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

  }

  login(username: string, password: string): Observable<User> {
    return this.userProvider.findByUsername(username);
  }

}
