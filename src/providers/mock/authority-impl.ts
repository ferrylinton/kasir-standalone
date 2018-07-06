import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { BaseProvider } from './base';
import { DataProvider } from './data';
import { AuthorityProvider } from '../authority/authority';
import { Authority } from '../../models/authority.model';


@Injectable()
export class AuthorityProviderImpl extends BaseProvider<Authority> implements AuthorityProvider {

  constructor(public dataProvider: DataProvider) {
    super(dataProvider.authorities);
  }

  findAll(): Observable<Array<Authority>> {
    return of(this.datas);
  }

}
