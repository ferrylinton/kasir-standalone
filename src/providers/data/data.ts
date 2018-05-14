
import { Injectable } from '@angular/core';
import { Authority } from '../../models/authority.model';
import { Role } from '../../models/role.model';
import { User } from '../../models/user.model';
import { Menu } from '../../models/menu.model';

@Injectable()
export class DataProvider {

  authorities: Authority[] = new Array<Authority>();

  roles: Role[] = new Array<Role>();

  users: User[] = new Array<User>();

  menus: Menu[] = new Array<Menu>();

  constructor() {
    this.init();
  }

  private init(): void {
    let admin = new User('user-0000-0000-0000-001', 'admin', 'password', 'Admin');

    let authorityView = new Authority('authority-0000-0000-0000-001', 'AUTHORITY_VIEW', 'View Authority Data');
    let roleView = new Authority('authority-0000-0000-0000-002', 'ROLE_VIEW', 'View Role Data');
    let roleChange = new Authority('authority-0000-0000-0000-003', 'ROLE_CHANGE', 'Change Role Data');
    let userView = new Authority('authority-0000-0000-0000-004', 'USER_VIEW', 'View User Data');
    let userChange = new Authority('authority-0000-0000-0000-005', 'USER_CHANGE', 'Change User Data');
    let menuView = new Authority('authority-0000-0000-0000-006', 'MENU_VIEW', 'View Menu Data');
    let menuChange = new Authority('authority-0000-0000-0000-007', 'MENU_CHANGE', 'Change Menu Data');
    let categoryView = new Authority('authority-0000-0000-0000-008', 'CATEGORY_VIEW', 'View Category Data');
    let categoryChange = new Authority('authority-0000-0000-0000-009', 'CATEGORY_CHANGE', 'Change Category Data');
    let productView = new Authority('authority-0000-0000-0000-010', 'PRODUCT_VIEW', 'View Product Data');
    let productChange = new Authority('authority-0000-0000-0000-011', 'PRODUCT_CHANGE', 'Change Product Data');
    let orderView = new Authority('authority-0000-0000-0000-012', 'ORDER_VIEW', 'View Order Data');
    let orderChange = new Authority('authority-0000-0000-0000-013', 'ORDER_CHANGE', 'Change Order Data');
    let settingView = new Authority('authority-0000-0000-0000-014', 'SETTING_VIEW', 'View Setting Data');
    let settingChange = new Authority('authority-0000-0000-0000-015', 'SETTING_CHANGE', 'Change Setting Data');
    let dbView = new Authority('authority-0000-0000-0000-016', 'DB_VIEW', 'View DB Data');
    let dbChange = new Authority('authority-0000-0000-0000-017', 'DB_CHANGE', 'Change DB Data');

    let roleAdmin = new Role('role-0000-0000-0000-001', 'Admin', 'Role as Admin', new Array<Authority>(), admin, new Date());
    roleAdmin.authorities.push(authorityView);
    roleAdmin.authorities.push(roleView);
    roleAdmin.authorities.push(roleChange);
    roleAdmin.authorities.push(userView);
    roleAdmin.authorities.push(userChange);
    roleAdmin.authorities.push(menuView);
    roleAdmin.authorities.push(menuChange);
    roleAdmin.authorities.push(categoryView);
    roleAdmin.authorities.push(categoryChange);
    roleAdmin.authorities.push(productView);
    roleAdmin.authorities.push(productChange);
    roleAdmin.authorities.push(settingView);
    roleAdmin.authorities.push(settingChange);
    roleAdmin.authorities.push(dbView);
    roleAdmin.authorities.push(dbChange);

    let roleManager = new Role('role-0000-0000-0000-002', 'Manager', 'Role as Manager', new Array<Authority>(), admin, new Date());
    roleManager.authorities.push(authorityView);
    roleManager.authorities.push(roleView);
    roleManager.authorities.push(roleChange);
    roleManager.authorities.push(userView);
    roleManager.authorities.push(userChange);
    roleManager.authorities.push(menuView);
    roleManager.authorities.push(menuChange);
    roleManager.authorities.push(categoryView);
    roleManager.authorities.push(categoryChange);
    roleManager.authorities.push(productView);
    roleManager.authorities.push(productChange);
    roleManager.authorities.push(orderView);
    roleManager.authorities.push(orderChange);
    roleManager.authorities.push(settingView);
    roleManager.authorities.push(settingChange);
    roleManager.authorities.push(dbView);

    let roleEmployee = new Role('role-0000-0000-0000-003', 'Employee', 'Role as Employee', new Array<Authority>(), admin, new Date());
    roleEmployee.authorities.push(categoryView);
    roleEmployee.authorities.push(productView);
    roleEmployee.authorities.push(orderView);
    roleEmployee.authorities.push(orderChange);
    roleEmployee.authorities.push(settingView);
    roleEmployee.authorities.push(dbView);

    admin.role = roleAdmin;
    let manager = new User('user-0000-0000-0000-002', 'manager', 'password', 'Manager', roleManager, true, admin, new Date());
    let employee = new User('user-0000-0000-0000-003', 'employee', 'password', 'Employee', roleEmployee, false, admin, new Date());

    let empty: Menu[] = new Array<Menu>();


    let mainMenus: Menu[] = new Array<Menu>();
    mainMenus.push(new Menu('menu-0000-0000-0000-101', 'Home', empty, 'HomePage', 'home'));
    mainMenus.push(new Menu('menu-0000-0000-0000-102', 'ProductList', empty, 'ProductListPage', 'medal'));
    mainMenus.push(new Menu('menu-0000-0000-0000-103', 'CategoryList', empty, 'CategoryListPage', 'albums'));
    mainMenus.push(new Menu('menu-0000-0000-0000-104', 'Order', empty, 'OrderPage', 'cart', orderView));
    mainMenus.push(new Menu('menu-0000-0000-0000-105', 'OrderHistory', empty, 'OrderHistoryPage', 'clipboard', orderView));

    let dataMenus: Menu[] = new Array<Menu>();
    dataMenus.push(new Menu('menu-0000-0000-0000-201', 'User', empty, 'UserPage', 'people', userView));
    dataMenus.push(new Menu('menu-0000-0000-0000-202', 'Role', empty, 'RolePage', 'build', roleView));
    dataMenus.push(new Menu('menu-0000-0000-0000-203', 'Authority', empty, 'AuthorityPage', 'hammer', authorityView));
    dataMenus.push(new Menu('menu-0000-0000-0000-204', 'Menu', empty, 'MenuPage', 'list', menuView));
    dataMenus.push(new Menu('menu-0000-0000-0000-205', 'Product', empty, 'ProductPage', 'medal', productView));
    dataMenus.push(new Menu('menu-0000-0000-0000-206', 'Category', empty, 'CategoryPage', 'albums', categoryView));

    let adminMenus: Menu[] = new Array<Menu>();
    adminMenus.push(new Menu('menu-0000-0000-0000-301', 'Database', empty, 'DatabasePage', 'archive', dbView));
    adminMenus.push(new Menu('menu-0000-0000-0000-302', 'Setting', empty, 'SettingPage', 'settings', settingView));

    let accountMenus: Menu[] = new Array<Menu>();
    accountMenus.push(new Menu('menu-0000-0000-0000-401', 'Profile', empty, 'ProfilePage', 'person'));
    accountMenus.push(new Menu('menu-0000-0000-0000-402', 'Logout', empty, 'LoginPage', 'log-out'));

    this.menus.push(new Menu('menu-0000-0000-0000-001', 'Main', mainMenus));
    this.menus.push(new Menu('menu-0000-0000-0000-002', 'Data', dataMenus));
    this.menus.push(new Menu('menu-0000-0000-0000-003', 'Database', adminMenus));
    this.menus.push(new Menu('menu-0000-0000-0000-004', 'Account', accountMenus));

    this.authorities.push(authorityView);
    this.authorities.push(roleView);
    this.authorities.push(roleChange);
    this.authorities.push(userView);
    this.authorities.push(userChange);
    this.authorities.push(menuView);
    this.authorities.push(menuChange);
    this.authorities.push(categoryView);
    this.authorities.push(categoryChange);
    this.authorities.push(productView);
    this.authorities.push(productChange);
    this.authorities.push(orderView);
    this.authorities.push(orderChange);
    this.authorities.push(settingView);
    this.authorities.push(settingChange);
    this.authorities.push(dbView);
    this.authorities.push(dbChange);

    this.roles.push(roleAdmin);
    this.roles.push(roleManager);
    this.roles.push(roleEmployee);

    this.users.push(admin);
    this.users.push(manager);
    this.users.push(employee);
  }
}
