import { Injectable } from '@angular/core';
import { MockProvider } from '../mock/mock';
import { DataProvider } from '../data/data';
import { MenuProvider } from './menu';
import { Menu } from '../../models/menu.model';

@Injectable()
export class MenuMockProvider extends MockProvider<Menu> implements MenuProvider {

  constructor(public dataProvider: DataProvider) {
    super();
    this.init();
  }

  private init(): void{
    this.setDatas(this.dataProvider.menus);
  }

}
