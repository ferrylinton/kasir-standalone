import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { BaseProvider } from './base';
import { DataProvider } from './data';
import { RoleProvider } from '../role/role';
import { Role } from '../../models/role.model';

@Injectable()
export class RoleProviderImpl extends BaseProvider<Role> implements RoleProvider {

  constructor(public dataProvider: DataProvider) {
    super(dataProvider.roles);
  }

  findAll(): Observable<Array<Role>> {
    return of(this.datas);
  }

}
