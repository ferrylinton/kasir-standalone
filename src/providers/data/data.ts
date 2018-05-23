
import { Injectable } from '@angular/core';
import { Authority } from '../../models/authority.model';
import { Role } from '../../models/role.model';
import { User } from '../../models/user.model';
import { Menu } from '../../models/menu.model';
import { Category } from '../../models/category.model';
import { Product } from '../../models/product.model';
import { DEFAULT_IMAGE } from '../../constant/constant';

@Injectable()
export class DataProvider {

  authorities: Authority[] = new Array<Authority>();

  roles: Role[] = new Array<Role>();

  users: User[] = new Array<User>();

  menus: Menu[] = new Array<Menu>();

  categories: Category[] = new Array<Category>();

  products: Product[] = new Array<Product>();

  constructor() {
    this.init();
  }

  private init(): void {
    let admin = new User('user-0000-0000-0000-001', 'admin', 'password', 'Admin');

    let basicAuthority = new Authority('authority-0000-0000-0000-001', 'BASIC_AUTHORITY', 'Basic Authority');
    let authorityView = new Authority('authority-0000-0000-0000-002', 'AUTHORITY_VIEW', 'View Authority Data');
    let roleView = new Authority('authority-0000-0000-0000-003', 'ROLE_VIEW', 'View Role Data');
    let roleChange = new Authority('authority-0000-0000-0000-004', 'ROLE_CHANGE', 'Change Role Data');
    let userView = new Authority('authority-0000-0000-0000-005', 'USER_VIEW', 'View User Data');
    let userChange = new Authority('authority-0000-0000-0000-006', 'USER_CHANGE', 'Change User Data');
    let menuView = new Authority('authority-0000-0000-0000-007', 'MENU_VIEW', 'View Menu Data');
    let menuChange = new Authority('authority-0000-0000-0000-008', 'MENU_CHANGE', 'Change Menu Data');
    let categoryView = new Authority('authority-0000-0000-0000-009', 'CATEGORY_VIEW', 'View Category Data');
    let categoryChange = new Authority('authority-0000-0000-0000-010', 'CATEGORY_CHANGE', 'Change Category Data');
    let productView = new Authority('authority-0000-0000-0000-011', 'PRODUCT_VIEW', 'View Product Data');
    let productChange = new Authority('authority-0000-0000-0000-012', 'PRODUCT_CHANGE', 'Change Product Data');
    let orderView = new Authority('authority-0000-0000-0000-013', 'ORDER_VIEW', 'View Order Data');
    let orderChange = new Authority('authority-0000-0000-0000-014', 'ORDER_CHANGE', 'Change Order Data');
    let settingView = new Authority('authority-0000-0000-0000-015', 'SETTING_VIEW', 'View Setting Data');
    let settingChange = new Authority('authority-0000-0000-0000-016', 'SETTING_CHANGE', 'Change Setting Data');
    let dbView = new Authority('authority-0000-0000-0000-017', 'DB_VIEW', 'View DB Data');
    let dbChange = new Authority('authority-0000-0000-0000-018', 'DB_CHANGE', 'Change DB Data');

    let roleAdmin = new Role('role-0000-0000-0000-001', 'Admin', 'Role as Admin', new Array<string>(), admin.username, new Date());
    roleAdmin.authorities.push(basicAuthority.name);
    roleAdmin.authorities.push(authorityView.name);
    roleAdmin.authorities.push(roleView.name);
    roleAdmin.authorities.push(roleChange.name);
    roleAdmin.authorities.push(userView.name);
    roleAdmin.authorities.push(userChange.name);
    roleAdmin.authorities.push(menuView.name);
    roleAdmin.authorities.push(menuChange.name);
    roleAdmin.authorities.push(categoryView.name);
    roleAdmin.authorities.push(categoryChange.name);
    roleAdmin.authorities.push(productView.name);
    roleAdmin.authorities.push(productChange.name);
    roleAdmin.authorities.push(settingView.name);
    roleAdmin.authorities.push(settingChange.name);
    roleAdmin.authorities.push(dbView.name);
    roleAdmin.authorities.push(dbChange.name);

    let roleManager = new Role('role-0000-0000-0000-002', 'Manager', 'Role as Manager', new Array<string>(), admin.username, new Date());
    roleManager.authorities.push(basicAuthority.name);
    roleManager.authorities.push(authorityView.name);
    roleManager.authorities.push(roleView.name);
    roleManager.authorities.push(roleChange.name);
    roleManager.authorities.push(userView.name);
    roleManager.authorities.push(userChange.name);
    roleManager.authorities.push(menuView.name);
    roleManager.authorities.push(menuChange.name);
    roleManager.authorities.push(categoryView.name);
    roleManager.authorities.push(categoryChange.name);
    roleManager.authorities.push(productView.name);
    roleManager.authorities.push(productChange.name);
    roleManager.authorities.push(orderView.name);
    roleManager.authorities.push(orderChange.name);
    roleManager.authorities.push(settingView.name);
    roleManager.authorities.push(settingChange.name);
    roleManager.authorities.push(dbView.name);

    let roleEmployee = new Role('role-0000-0000-0000-003', 'Employee', 'Role as Employee', new Array<string>(), admin.username, new Date());
    roleEmployee.authorities.push(basicAuthority.name);
    roleEmployee.authorities.push(categoryView.name);
    roleEmployee.authorities.push(productView.name);
    roleEmployee.authorities.push(orderView.name);
    roleEmployee.authorities.push(orderChange.name);

    admin.role = roleAdmin.name;
    admin.activated = true;
    admin.authorities = roleAdmin.authorities
    let manager = new User('user-0000-0000-0000-002', 'manager', 'password', 'Manager', roleManager.name, roleManager.authorities, true, admin.username, new Date());
    let employee = new User('user-0000-0000-0000-003', 'employee', 'password', 'Employee', roleEmployee.name, roleEmployee.authorities, false, admin.username, new Date());

    let mainGroup = new Menu('menu-0000-0000-0000-100', 'Main');
    let homePage = new Menu('menu-0000-0000-0000-101', 'Home', mainGroup, null, 'HomePage', 'home', basicAuthority.name);
    let productListPage = new Menu('menu-0000-0000-0000-102', 'ProductList', mainGroup, null, 'ProductListPage', 'medal', basicAuthority.name);
    let categoryListPage = new Menu('menu-0000-0000-0000-103', 'CategoryList', mainGroup, null, 'CategoryListPage', 'albums', basicAuthority.name);
    let orderPage = new Menu('menu-0000-0000-0000-104', 'Order', mainGroup, null, 'OrderPage', 'cart', orderView.name);
    let orderHistoryPage = new Menu('menu-0000-0000-0000-105', 'OrderHistory', mainGroup, null, 'OrderHistoryPage', 'clipboard', orderView.name);
    let dataGroup = new Menu('menu-0000-0000-0000-200', 'Data');
    let userPage = new Menu('menu-0000-0000-0000-201', 'User', dataGroup, null, 'UserPage', 'people', userView.name);
    let rolePage =new Menu('menu-0000-0000-0000-202', 'Role', dataGroup, null, 'RolePage', 'build', roleView.name);
    let auhtorityPage = new Menu('menu-0000-0000-0000-203', 'Authority', dataGroup, null, 'AuthorityPage', 'hammer', authorityView.name);
    let menuPage = new Menu('menu-0000-0000-0000-204', 'Menu', dataGroup, null, 'MenuPage', 'list', menuView.name);
    let productPage = new Menu('menu-0000-0000-0000-205', 'Product', dataGroup, null, 'ProductPage', 'medal', productView.name);
    let categoryPage = new Menu('menu-0000-0000-0000-206', 'Category', dataGroup, null, 'CategoryPage', 'albums', categoryView.name);
    let databaseGroup = new Menu('menu-0000-0000-0000-300', 'DB');
    let databasePage = new Menu('menu-0000-0000-0000-301', 'Database', databaseGroup, null, 'DatabasePage', 'archive', dbView.name);
    let settingPage = new Menu('menu-0000-0000-0000-302', 'Setting', databaseGroup, null, 'SettingPage', 'settings', settingView.name);
    let accountGroup = new Menu('menu-0000-0000-0000-400', 'Account');
    let profilePage = new Menu('menu-0000-0000-0000-401', 'Profile', accountGroup, null, 'ProfilePage', 'person', basicAuthority.name);
    let logoutPage = new Menu('menu-0000-0000-0000-402', 'Logout', accountGroup, null, 'LoginPage', 'log-out', basicAuthority.name);
    
    this.menus.push(mainGroup);
    this.menus.push(homePage);
    this.menus.push(productListPage);
    this.menus.push(categoryListPage);
    this.menus.push(orderPage);
    this.menus.push(orderHistoryPage);
    this.menus.push(dataGroup);
    this.menus.push(userPage);
    this.menus.push(rolePage);
    this.menus.push(auhtorityPage);
    this.menus.push(menuPage);
    this.menus.push(productPage);
    this.menus.push(categoryPage);
    this.menus.push(databaseGroup);
    this.menus.push(databasePage);
    this.menus.push(settingPage);
    this.menus.push(accountGroup);
    this.menus.push(profilePage);
    this.menus.push(logoutPage);

    this.authorities.push(basicAuthority);
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

    for(let i:number = 1; i<6; i++){
      let category: Category = new Category('category-0000-0000-0000-' + this.zeroPad(i, 3), 'Category ' + this.zeroPad(i, 3), 'Category Description ' + this.zeroPad(i, 3), DEFAULT_IMAGE, admin.username, new Date());
      this.categories.push(category);

      let start: number = i * 100;
      let end: number = start + 10;
      for(let j:number = start; j <= end; j++){
        this.products.push(new Product('product-0000-0000-0000-' + j, 'Product ' + j, 'Description ' + j, j + 100000, DEFAULT_IMAGE, category.name, admin.username, new Date()));
      }
    }

  }

  zeroPad(num: number, places: number): string {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }
}
