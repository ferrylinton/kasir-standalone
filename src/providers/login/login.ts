import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserProvider } from '../user/user';
import { User } from '../../models/user.model';


@Injectable()
export class LoginProvider {

  constructor(
    public userProvider: UserProvider) {
  }

  login(username: string, password: string): Observable<User> {
    return this.userProvider.findByUsername(username);
  }

}
