import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Role } from '../../models/role.model';
import { Authority } from '../../models/authority.model';
import { AuthorityProvider } from '../../providers/authority/authority';
import { RoleProvider } from '../../providers/role/role';
import { v4 as uuid } from 'uuid';
import { User } from '../../models/user.model';
import { Storage } from '@ionic/storage';
import { LOGGED_USER } from '../../constant/constant';

@IonicPage()
@Component({
  selector: 'page-role-add',
  templateUrl: 'role-add.html',
})
export class RoleAddPage {

  authorities: Authority[];

  isReadyToSave: boolean;

  form: FormGroup;

  role: Role;

  loggedUser: User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public storage: Storage,
    public authorityProvider: AuthorityProvider,
    public roleProvider: RoleProvider) {

    this.initRole();
    this.initAuthorities();
    this.initForm();

    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });

    storage.get(LOGGED_USER).then((val) => {
      this.loggedUser = JSON.parse(val);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoleAddPage');
  }

  private initRole(): void {
    this.role = new Role(uuid());
    this.role.authorities = new Array<Authority>();
  }

  private initAuthorities(): void {
    this.authorityProvider.findAll()
      .subscribe(authorities => {
        this.authorities = authorities;
      })
  }

  private initForm(): void {
    let authorityControlArray = new FormArray(this.authorities.map((authority) => {
      return this.formBuilder.group({
        id: [authority.id],
        name: [authority.name],
        checked: [this.isContainAuthority(authority)]
      });
    }));

    this.form = this.formBuilder.group({
      id: [this.role.id],
      name: [this.role.name, Validators.required],
      description: [this.role.description],
      authorities: authorityControlArray
    });

  }

  private isContainAuthority(authority: Authority): boolean {
    for (let i: number = 0; i < this.role.authorities.length; i++) {
      if (this.role.authorities[i].id === authority.id) {
        return true;
      }
    }

    return false;
  }

  private convertToAuthorities(): Authority[] {
    let authorities: Authority[] = new Array<Authority>();
    for (let i: number = 0; i < this.form.value.authorities.length; i++) {
      if (this.form.value.authorities[i].checked) {
        authorities.push(new Authority(this.form.value.authorities[i].id, this.form.value.authorities[i].name));
      }
    }

    return authorities;
  }

  save(): void {
    if (!this.form.valid) {
      return;
    } else {
      let role: Role = this.form.value;
      role.createdBy = this.loggedUser;
      role.createdDate = new Date();
      role.authorities = this.convertToAuthorities();
      this.roleProvider.save(role).subscribe(result => {
        console.log(JSON.stringify(result));
      });
      
    }
  }


}
