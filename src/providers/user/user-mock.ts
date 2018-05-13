import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { MockProvider } from '../mock/mock';
import { RoleProvider } from '../role/role';
import { UserProvider } from './user';
import { Role } from '../../models/role.model';
import { User } from '../../models/user.model';


@Injectable()
export class UserMockProvider extends MockProvider<User> implements UserProvider {

  private roles: Array<Role>;

  private admin: Role;

  private manager: Role;

  private employee: Role;

  constructor(public roleProvider: RoleProvider) {
    super();
    this.init();
  }

  private init(): void {
    this.initRoles();
    this.initUsers();
  }

  private initUsers(): void {
    let users = new Array<User>();
    let user: User = new User('user-0000-0000-0000-001', 'admin', 'password', 'Admin Admin', this.admin);
    users.push(new User('user-0000-0000-0000-001', 'admin', 'password', 'Admin Admin', this.admin, true, user, new Date()));
    users.push(new User('user-0000-0000-0000-002', 'manager', 'password', 'Manager Manager', this.manager, true, user, new Date()));
    users.push(new User('user-0000-0000-0000-003', 'employee', 'password', 'Employee Employee', this.employee, false, user, new Date()));
    this.setDatas(users);
  }

  private initRoles(): void {
    if (this.roles === undefined) {
      this.roleProvider.findAll()
        .forEach(roles => {
          this.roles = roles;
        })
        .catch(error => {
          console.log(error);
          throw (error.message || error);
        });
    }

    this.roleProvider.findById('role-0000-0000-0000-001').subscribe(role => {
      this.admin = role;
    });

    this.roleProvider.findById('role-0000-0000-0000-002').subscribe(role => {
      this.manager = role;
    });

    this.roleProvider.findById('role-0000-0000-0000-003').subscribe(role => {
      this.employee = role;
    });

  }

  findByUsername(username: string): Observable<User> {
    let user: User = null;
    for (let i: number = 0; i < this.datas.length; i++) {
      let temp: User = this.datas[i];
      if (temp.username === username) {
        user = temp;
      }
    }

    return of(user);
  }

}
