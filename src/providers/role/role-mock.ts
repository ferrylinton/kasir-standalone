import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of'; 
import { RoleProvider } from './role';
import { Authority } from '../../models/authority.model';
import { Role } from '../../models/role.model';

@Injectable()
export class RoleMockProvider extends  RoleProvider{

  private roles: Role[];

  constructor() {
    super();
    this.init();
  }

  private init(): void{
    if(this.roles === undefined){
      this.roles = new Array<Role>();
      this.roles.push(new Role('role-0000-0000-0000-001', 'Admin', 'Role as Admin', this.getAdminAuthorities()));
      this.roles.push(new Role('role-0000-0000-0000-002', 'Manager', 'Role as Manager', this.getManagerAuthorities()));
      this.roles.push(new Role('role-0000-0000-0000-003', 'Employee', 'Role as Employee', this.getEmployeeAuthorities()));
    }
  }

  private getAdminAuthorities(): Authority[]{
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

  private getManagerAuthorities(): Authority[]{
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

  private getEmployeeAuthorities(): Authority[]{
    let authorities = new Array<Authority>();

    authorities.push(new Authority('authority-0000-0000-0000-008', 'CATEGORY_VIEW', 'View Category Data'));
    authorities.push(new Authority('authority-0000-0000-0000-010', 'PRODUCT_VIEW', 'View Product Data'));
    authorities.push(new Authority('authority-0000-0000-0000-012', 'ORDER_VIEW', 'View Order Data'));
    authorities.push(new Authority('authority-0000-0000-0000-013', 'ORDER_CHANGE', 'Change Order Data'));
    authorities.push(new Authority('authority-0000-0000-0000-014', 'SETTING_VIEW', 'View Setting Data'));
    authorities.push(new Authority('authority-0000-0000-0000-016', 'DB_VIEW', 'View DB Data'));
    
    return authorities;
  }

  findById(id: string): Observable<Role> {
    let role: Role = null;
    for(let i:number = 0; i < this.roles.length; i++){
      if(this.roles[i].id === id){
        role = this.roles[i];
      }
    }

    return of(role);
  }

  findAll(): Observable<Role[]> {
    return of(this.roles);
  }

  save(role: Role): void {
    throw new Error("Method not implemented.");
  }

  update(role: Role): void {
    throw new Error("Method not implemented.");
  }

  delete(id: string): void {
    throw new Error("Method not implemented.");
  }
  
}
