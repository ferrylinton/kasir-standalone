import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { UserProvider } from '../user/user';
import { MenuProvider } from '../menu/menu';
import { LoginProvider } from './login';


@Injectable()
export class LoginMockProvider extends LoginProvider {

  constructor(
    public userProvider: UserProvider,
    public menuProvider: MenuProvider) {
    super();
  }

  login(username: string, password: string): Observable<any> {
    return forkJoin([
      this.userProvider.findByUsername(username),
      this.menuProvider.findAll()
    ]);
  }

}
