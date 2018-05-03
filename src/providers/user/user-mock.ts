import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of'; 
import { RoleProvider } from '../role/role';
import { Role } from '../../models/role.model';
import { User } from '../../models/user.model';
import { UserProvider } from './user';

@Injectable()
export class UserMockProvider extends UserProvider {

  private roles: Role[];

  private admin: Role;

  private manager: Role;

  private employee: Role;

  private users: User[];

  constructor(public roleProvider: RoleProvider){
    super();
    this.init();
  }

  private init(): void{
    this.initRoles();
    this.initUsers();
  }
  
  private initUsers(): void{
    if(this.users === undefined){
      this.users = new Array<User>();
      this.users.push(new User('user-0000-0000-0000-001', 'admin', 'password', 'Admin Admin', this.admin));
      this.users.push(new User('user-0000-0000-0000-002', 'manager', 'password', 'Manager Manager', this.manager));
      this.users.push(new User('user-0000-0000-0000-003', 'employee', 'password', 'Employee Employee', this.employee));
    }
  }

  private initRoles(): void{
    if(this.roles === undefined){
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

  findById(id: string): Observable<User> {
    let user: User = null;
    for(let i:number = 0; i < this.roles.length; i++){
      if(this.users[i].id === id){
        user = this.roles[i];
      }
    }

    return of(user);
  }

  findByUsername(username: string): Observable<User> {
    let user: User = null;
    for(let i:number = 0; i < this.roles.length; i++){
      if(this.users[i].username === username){
        user = this.roles[i];
      }
    }

    return of(user);
  }

  findAll(): Observable<User[]> {
    return of(this.users);
  }

  save(role: User): void {
    throw new Error("Method not implemented.");
  }

  update(role: User): void {
    throw new Error("Method not implemented.");
  }

  delete(id: string): void {
    throw new Error("Method not implemented.");
  }
}
