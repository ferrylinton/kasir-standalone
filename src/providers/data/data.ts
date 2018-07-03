import { Injectable } from '@angular/core';
import { DEFAULT_IMAGE } from '../../constant/constant';
import { v4 as uuid } from 'uuid';
import moment from 'moment';

import { UtilProvider } from '../util/util';
import { Authority } from '../../models/authority.model';
import { Role } from '../../models/role.model';
import { User } from '../../models/user.model';
import { Category } from '../../models/category.model';
import { Currency } from '../../models/currency.model';
import { Product } from '../../models/product.model';
import { Order } from '../../models/order.model';
import { Item } from '../../models/item.model';
import { DEFAULT_USER } from '../../constant/user-image';



@Injectable()
export class DataProvider {

  authorities: Array<Authority> = new Array<Authority>();

  roles: Array<Role> = new Array<Role>();

  users: Array<User> = new Array<User>();

  categories: Array<Category> = new Array<Category>();

  currencies: Array<Currency> = new Array<Category>();

  products: Array<Product> = new Array<Product>();

  orders: Array<Order> = new Array<Order>();

  description: string = `Parsley amaranth tigernut silver beet maize fennel spinach. Ricebean black-eyed pea maize
  scallion green bean spinach cabbage jícama bell pepper carrot onion corn plantain garbanzo.
  Sierra leone bologi komatsuna celery peanut swiss chard silver beet squash dandelion maize
  chicory burdock tatsoi dulse radish wakame beetroot.`;
 
  constructor(public util: UtilProvider) {
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
    let dbView = new Authority('authority-0000-0000-0000-017', 'DATABASE_VIEW', 'View DB Data');
    let dbChange = new Authority('authority-0000-0000-0000-018', 'DATABASE_CHANGE', 'Change DB Data');
    let currencyView = new Authority('authority-0000-0000-0000-019', 'CURRENCY_VIEW', 'View Currency Data');
    let currencyChange = new Authority('authority-0000-0000-0000-020', 'CURRENCY_CHANGE', 'Change Currency Data');

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
    roleAdmin.authorities.push(currencyView.name);
    roleAdmin.authorities.push(currencyChange.name);

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
    roleManager.authorities.push(currencyView.name);
    roleManager.authorities.push(currencyChange.name);

    let roleEmployee = new Role('role-0000-0000-0000-003', 'Employee', 'Role as Employee', new Array<string>(), admin.username, new Date());
    roleEmployee.authorities.push(basicAuthority.name);
    roleEmployee.authorities.push(categoryView.name);
    roleEmployee.authorities.push(productView.name);
    roleEmployee.authorities.push(orderView.name);
    roleEmployee.authorities.push(orderChange.name);
    roleEmployee.authorities.push(currencyView.name);

    admin.role = roleAdmin.name;
    admin.activated = true;
    admin.authorities = roleAdmin.authorities
    admin.image = DEFAULT_USER;
    admin.createdDate = new Date();
    let manager = new User('user-0000-0000-0000-002', 'manager', 'password', 'Manager', roleManager.name, roleManager.authorities, true, DEFAULT_USER, admin.username, new Date());
    let employee = new User('user-0000-0000-0000-003', 'employee', 'password', 'Employee', roleEmployee.name, roleEmployee.authorities, false, DEFAULT_USER, admin.username, new Date());

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

    for(let i=100; i<= 125; i++){
      this.users.push(new User('user-0000-0000-0000-' + i, 'employee' + i, 'password', 'Employee' + i, roleEmployee.name, roleEmployee.authorities, false, DEFAULT_USER, admin.username, new Date()));
    }

    for(let i=1; i<5; i++){
      let category: Category = new Category('category-0000-0000-0000-' + this.zeroPad(i, 3), 'Category ' + this.zeroPad(i, 3), 'Category Description ' + this.zeroPad(i, 3), DEFAULT_IMAGE, admin.username, new Date());
      this.categories.push(category);

      let start = i * 100;
      let end = start + 3;
      for(let j=start; j<=end; j++){
        this.products.push(new Product('product-0000-0000-0000-' + j, 'Product ' + j, 'Description ' + j, j + 100000, DEFAULT_IMAGE, category.name, admin.username, new Date()));
        this.products.push(new Product(this.util.randomString(30), this.util.randomString(30), this.description, j + 100000, DEFAULT_IMAGE, category.name, admin.username, new Date()));
      }
    }

    for(let i=1; i<=100; i++){
      let remainder = i%3;
      let createdDate = moment().subtract(this.util.randomNumber(2, 3000), 'minutes').toDate();
      let order = new Order(uuid(), this.util.transactionNumber(), new Array<Item>(), true, false, this.users[remainder].username, createdDate);

      let size = this.util.randomNumber(2, 20);
      for(let j=1; j<=size; j++){
        order.items.push(new Item(uuid(), this.products[j], j+1));
      }

      this.orders.push(order);
    }

    this.currencies.push(new Currency('currency-0000-0000-0000-1', 'IDR', 'Indonesian Rupiah' , admin.username, new Date()));
    this.currencies.push(new Currency('currency-0000-0000-0000-1', 'USD', 'US Dollar' , admin.username, new Date()));
  }

  zeroPad(num: number, places: number): string {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }
}
