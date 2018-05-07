import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '../../models/role.model';
import { AuthorityProvider } from '../../providers/authority/authority';
import { Authority } from '../../models/authority.model';

@IonicPage()
@Component({
  selector: 'page-role-form',
  templateUrl: 'role-form.html',
})
export class RoleFormPage {

  authorities: Authority[];

  isReadyToSave: boolean;

  role: Role;

  operation: string;

  form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public authorityProvider: AuthorityProvider,
    public roleProvider: AuthorityProvider) {

    this.role = navParams.get('data');
    this.operation = navParams.get('operation');

    this.authorityProvider.findAll()
      .subscribe(authorities => {
        this.authorities = authorities;
      })

    console.log('------------- role form : ' + JSON.stringify(this.role));
    this.form = formBuilder.group({
      id: [this.role.id],
      name: [this.role.name, Validators.required],
      description: [this.role.description],
      authorities: [this.role.authorities],
      modifiedDate: [this.role.lastModifiedDate],
      createdDate: [this.role.createdDate]
    });

    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoleFormPage');
  }

  trackByFn(index, item) {
    return item.id;
  }

  compareAuthority(authority1: Authority, authority2: Authority): boolean{
    return authority1.id === authority2.id;
  }
}
