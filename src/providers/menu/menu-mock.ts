import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of'; 
import { MenuProvider } from './menu';
import { Authority } from '../../models/authority.model';
import { Menu } from '../../models/menu.model';

@Injectable()
export class MenuMockProvider extends MenuProvider {

  private menus: Menu[];

  constructor() {
    super();
    this.init();
  }

  private init(): void{
    if(this.menus === undefined){
      let empty: Menu[] = new Array<Menu>();
      this.menus = new Array<Menu>();

      let mainMenus: Menu[] = new Array<Menu>();
      mainMenus.push(new Menu('menu-0000-0000-0000-101', 'Home', empty, 'HomePage', 'home'));
      mainMenus.push(new Menu('menu-0000-0000-0000-102', 'ProductList', empty, 'ProductListPage', 'medal'));
      mainMenus.push(new Menu('menu-0000-0000-0000-103', 'CategoryList', empty, 'CategoryListPage', 'albums'));
      mainMenus.push(new Menu('menu-0000-0000-0000-104', 'Order', empty, 'OrderPage', 'cart'));
      mainMenus.push(new Menu('menu-0000-0000-0000-105', 'OrderHistory', empty, 'OrderHistoryPage', 'clipboard'));

      let dataMenus: Menu[] = new Array<Menu>();
      dataMenus.push(new Menu('menu-0000-0000-0000-201', 'User', empty, 'UserPage', 'people'));
      dataMenus.push(new Menu('menu-0000-0000-0000-202', 'Role', empty, 'RolePage', 'build'));
      dataMenus.push(new Menu('menu-0000-0000-0000-203', 'Authority', empty, 'AuthorityPage', 'hammer'));
      dataMenus.push(new Menu('menu-0000-0000-0000-204', 'Menu', empty, 'MenuPage', 'list'));
      dataMenus.push(new Menu('menu-0000-0000-0000-205', 'Product', empty, 'ProductPage', 'medal'));
      dataMenus.push(new Menu('menu-0000-0000-0000-206', 'Category', empty, 'CategoryPage', 'albums'));

      let adminMenus: Menu[] = new Array<Menu>();
      adminMenus.push(new Menu('menu-0000-0000-0000-301', 'Database', empty, 'DatabasePage', 'archive'));
      adminMenus.push(new Menu('menu-0000-0000-0000-302', 'Setting', empty, 'SettingPage', 'settings'));

      let accountMenus: Menu[] = new Array<Menu>();
      accountMenus.push(new Menu('menu-0000-0000-0000-401', 'Profile', empty, 'ProfilePage', 'person'));
      accountMenus.push(new Menu('menu-0000-0000-0000-402', 'Logout', empty, 'LoginPage', 'log-out'));
      
      
      this.menus.push(new Menu('menu-0000-0000-0000-001', 'Main', mainMenus));
      this.menus.push(new Menu('menu-0000-0000-0000-002', 'Data', dataMenus));
      this.menus.push(new Menu('menu-0000-0000-0000-003', 'Database', adminMenus));
      this.menus.push(new Menu('menu-0000-0000-0000-004', 'Account', accountMenus));
    }
  }

  findById(id: string): Observable<Menu> {
    throw new Error("Method not implemented.");
  }

  findAll(): Observable<Menu[]> {
    return of(this.menus);
  }
  
}
