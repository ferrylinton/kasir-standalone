import { Injectable } from '@angular/core';
import { MockProvider } from '../mock/mock';
import { RoleProvider } from './role';
import { Authority } from '../../models/authority.model';
import { Role } from '../../models/role.model';
import { User } from '../../models/user.model';

@Injectable()
export class RoleMockProvider extends MockProvider<Role> implements RoleProvider {

  constructor() {
    super();
    this.init();
  }

  private init(): void {
    let roles: Role[] = new Array<Role>();
    let user: User = new User('user-0000-0000-0000-001', 'admin', 'password', 'Admin Admin');


    roles.push(new Role('role-0000-0000-0000-001', 'Admin', 'Role as Admin', this.getAdminAuthorities(), user, new Date()));
    roles.push(new Role('role-0000-0000-0000-002', 'Manager', 'Role as Manager', this.getManagerAuthorities()));
    roles.push(new Role('role-0000-0000-0000-003', 'Employee', 'Role as Employee', this.getEmployeeAuthorities()));

    this.setDatas(roles);
  }

  private getAdminAuthorities(): Authority[] {
    let authorities = new Array<Authority>();

    authorities.push(new Authority('authority-0000-0000-0000-001', 'AUTHORITY_VIEW', 'View Authority Data'));
    authorities.push(new Authority('authority-0000-0000-0000-002', 'ROLE_VIEW', 'View Role Data'));
    authorities.push(new Authority('authority-0000-0000-0000-003', 'ROLE_CHANGE', 'Change Role Data'));
    authorities.push(new Authority('authority-0000-0000-0000-004', 'USER_VIEW', 'View User Data'));
    authorities.push(new Authority('authority-0000-0000-0000-005', 'USER_CHANGE', 'Change User Data'));
    authorities.push(new Authority('authority-0000-0000-0000-006', 'MENU_VIEW', 'View Menu Data'));
    authorities.push(new Authority('authority-0000-0000-0000-007', 'MENU_CHANGE', 'Change Menu Data'));
    authorities.push(new Authority('authority-0000-0000-0000-008', 'CATEGORY_VIEW', 'View Category Data'));
    authorities.push(new Authority('authority-0000-0000-0000-009', 'CATEGORY_CHANGE', 'Change Category Data'));
    authorities.push(new Authority('authority-0000-0000-0000-010', 'PRODUCT_VIEW', 'View Product Data'));
    authorities.push(new Authority('authority-0000-0000-0000-011', 'PRODUCT_CHANGE', 'Change Product Data'));
    authorities.push(new Authority('authority-0000-0000-0000-014', 'SETTING_VIEW', 'View Setting Data'));
    authorities.push(new Authority('authority-0000-0000-0000-015', 'SETTING_CHANGE', 'Change Setting Data'));
    authorities.push(new Authority('authority-0000-0000-0000-016', 'DB_VIEW', 'View DB Data'));
    authorities.push(new Authority('authority-0000-0000-0000-017', 'DB_CHANGE', 'Change DB Data'));

    return authorities;
  }

  private getManagerAuthorities(): Authority[] {
    let authorities = new Array<Authority>();

    authorities.push(new Authority('authority-0000-0000-0000-001', 'AUTHORITY_VIEW', 'View Authority Data'));
    authorities.push(new Authority('authority-0000-0000-0000-002', 'ROLE_VIEW', 'View Role Data'));
    authorities.push(new Authority('authority-0000-0000-0000-003', 'ROLE_CHANGE', 'Change Role Data'));
    authorities.push(new Authority('authority-0000-0000-0000-004', 'USER_VIEW', 'View User Data'));
    authorities.push(new Authority('authority-0000-0000-0000-005', 'USER_CHANGE', 'Change User Data'));
    authorities.push(new Authority('authority-0000-0000-0000-006', 'MENU_VIEW', 'View Menu Data'));
    authorities.push(new Authority('authority-0000-0000-0000-007', 'MENU_CHANGE', 'Change Menu Data'));
    authorities.push(new Authority('authority-0000-0000-0000-008', 'CATEGORY_VIEW', 'View Category Data'));
    authorities.push(new Authority('authority-0000-0000-0000-009', 'CATEGORY_CHANGE', 'Change Category Data'));
    authorities.push(new Authority('authority-0000-0000-0000-010', 'PRODUCT_VIEW', 'View Product Data'));
    authorities.push(new Authority('authority-0000-0000-0000-011', 'PRODUCT_CHANGE', 'Change Product Data'));
    authorities.push(new Authority('authority-0000-0000-0000-012', 'ORDER_VIEW', 'View Order Data'));
    authorities.push(new Authority('authority-0000-0000-0000-013', 'ORDER_CHANGE', 'Change Order Data'));
    authorities.push(new Authority('authority-0000-0000-0000-014', 'SETTING_VIEW', 'View Setting Data'));
    authorities.push(new Authority('authority-0000-0000-0000-015', 'SETTING_CHANGE', 'Change Setting Data'));
    authorities.push(new Authority('authority-0000-0000-0000-016', 'DB_VIEW', 'View DB Data'));

    return authorities;
  }

  private getEmployeeAuthorities(): Authority[] {
    let authorities = new Array<Authority>();

    authorities.push(new Authority('authority-0000-0000-0000-008', 'CATEGORY_VIEW', 'View Category Data'));
    authorities.push(new Authority('authority-0000-0000-0000-010', 'PRODUCT_VIEW', 'View Product Data'));
    authorities.push(new Authority('authority-0000-0000-0000-012', 'ORDER_VIEW', 'View Order Data'));
    authorities.push(new Authority('authority-0000-0000-0000-013', 'ORDER_CHANGE', 'Change Order Data'));
    authorities.push(new Authority('authority-0000-0000-0000-014', 'SETTING_VIEW', 'View Setting Data'));
    authorities.push(new Authority('authority-0000-0000-0000-016', 'DB_VIEW', 'View DB Data'));

    return authorities;
  }

}
