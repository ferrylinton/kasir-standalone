import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
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

  private init(): void {
    this.setDatas(this.dataProvider.menus);
  }

  build(menus: Menu[], authorities: string[]): Observable<Menu[]> {
    let result = this.getGroupMenu(menus);

    menus.forEach((menu, index) => {
      for (let i = 0; i < result.length; i++) {
        if (menu.parent !== undefined && menu.parent.id === result[i].id && authorities.indexOf(menu.authority) > -1) {
          let temp = JSON.parse(JSON.stringify(menu));
          delete temp.menus;
          delete temp.parent;
          delete temp.authority;

          result[i].menus.push(temp);
        }
      }
    });

    return of(this.removeEmptyGroup(result));
  }

  private getGroupMenu(menus: Menu[]): Menu[] {
    let result = new Array<Menu>();

    menus.forEach((menu, index) => {
      if (menu.parent == null) {
        let temp = JSON.parse(JSON.stringify(menu));
        temp.menus = new Array<Menu>();
        result.push(temp);
      }
    });

    return result;
  }

  private removeEmptyGroup(menus: Menu[]): Menu[] {
    let indexes = new Array<number>();

    for (let i = 0; i < menus.length; i++) {
      if (menus[i].menus.length === 0) {
        indexes.push(i);
      }
    }

    for (let i = 0; i < indexes.length; i++) {
      menus.splice(indexes[i], 1);
    }

    return menus;
  }

}
