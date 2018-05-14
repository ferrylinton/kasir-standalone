import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { MockProvider } from '../mock/mock';
import { DataProvider } from '../data/data';
import { UserProvider } from './user';
import { User } from '../../models/user.model';


@Injectable()
export class UserMockProvider extends MockProvider<User> implements UserProvider {

  constructor(public dataProvider: DataProvider) {
    super();
    this.init();
  }

  private init(): void {
    this.setDatas(this.dataProvider.users);
  }

  findByUsername(username: string): Observable<User> {
    let user: User = null;
    for (let i: number = 0; i < this.datas.length; i++) {
      let temp: User = this.datas[i];
      if (temp.username === username) {
        user = temp;
      }
    }

    return of(user);
  }

}
