import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserProvider } from '../user/user';
import { LoginProvider } from '../login/login';
import { User } from '../../models/user.model';


@Injectable()
export class LoginProviderImpl extends LoginProvider {

  constructor(
    public userProvider: UserProvider) {
    super();
  }

  login(username: string, password: string): Observable<User> {
    return this.userProvider.findByUsername(username);
  }

}
