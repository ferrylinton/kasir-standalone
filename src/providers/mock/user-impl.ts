import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { BaseProvider } from './base';
import { DataProvider } from './data';
import { UtilProvider } from '../util/util';
import { UserProvider } from '../user/user';

import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';
import { User } from '../../models/user.model';


@Injectable()
export class UserProviderImpl extends BaseProvider<User> implements UserProvider {

  constructor(
    public dataProvider: DataProvider,
    public utilProvider: UtilProvider) {
    super(dataProvider.users);
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

  findByFullname(fullname: string, pageable: Pageable): Observable<Page<User>> {
    let datas: Array<User> = this.datas;

    if (fullname && fullname.trim() != '') {
      datas = this.utilProvider.filterObject(datas, 'fullname', fullname);
    }

    if (pageable.sort != null) {
      datas = this.utilProvider.sortObject(datas, pageable.sort);
    }

    return of(this.getPage(datas, pageable));
  }
}
