import { Injectable } from '@angular/core';
import { MockProvider } from '../mock/mock';
import { DataProvider } from '../data/data';
import { AuthorityProvider } from './authority';
import { Authority } from '../../models/authority.model';


@Injectable()
export class AuthorityMockProvider extends MockProvider<Authority> implements AuthorityProvider {

  constructor(public dataProvider: DataProvider) {
    super();
    this.init();
  }

  private init() {
    this.setDatas(this.dataProvider.authorities);
  }

}
