import { Injectable } from '@angular/core';
import { MockProvider } from '../mock/mock';
import { DataProvider } from '../data/data';
import { RoleProvider } from './role';
import { Role } from '../../models/role.model';

@Injectable()
export class RoleMockProvider extends MockProvider<Role> implements RoleProvider {

  constructor(public dataProvider: DataProvider) {
    super();
    this.init();
  }

  private init(): void {
    this.setDatas(this.dataProvider.roles);
  }

}
