import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { UserProvider } from '../user/user';
import { MenuProvider } from '../menu/menu';
import { LoginProvider } from './login';
import { Login } from '../../models/login.model';


@Injectable()
export class LoginMockProvider extends LoginProvider {

  constructor(
    public userProvider: UserProvider,
    public menuProvider: MenuProvider) {

    super();
  }

  doLogin(login: Login): Observable<any> {
    return forkJoin([
      this.userProvider.findByUsername(login.username),
      this.menuProvider.findAll()
    ]);
  }

}
