import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Role } from '../../models/role.model';
import { AuthorityProvider } from '../../providers/authority/authority';
import { Authority } from '../../models/authority.model';
import { Base } from '../../models/base.model';

@IonicPage()
@Component({
  selector: 'page-role-form',
  templateUrl: 'role-form.html',
})
export class RoleFormPage {

  authorities: Authority[];

  selectedAuthorities: FormArray;

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

    let authorityControlArray = new FormArray(this.authorities.map((authority) => {
      let controls: any = {};
      controls[authority.id] = new FormControl(this.isContainAuthority(authority));
      return new FormGroup(controls);
    }));

    this.form = this.formBuilder.group({
      id: [this.role.id],
      name: [this.role.name, Validators.required],
      description: [this.role.description],
      authorities: authorityControlArray,
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

  compareAuthority(authority1: Authority, authority2: Authority): boolean {
    return authority1.id === authority2.id;
  }

  onChange(authority: Authority, checkbox: any) {
    console.log('onChange authority : ' + JSON.stringify(authority));
    console.log('onChange checkbox : ' + JSON.stringify(checkbox));

    let index: number = this.getIndexFromArray(authority, this.role.authorities);

    if (index > -1 && !checkbox[authority.id]) {
      this.role.authorities.splice(index, 1);
    }else if(index < 0 && checkbox[authority.id]){
      this.role.authorities.push(authority);
    }

    console.log('onChange authorities : ' + JSON.stringify(this.form.value));
  }

  isContainAuthority(authority: Authority): boolean {
    for (let i: number = 0; i < this.role.authorities.length; i++) {
      if (this.role.authorities[i].id === authority.id) {
        return true;
      }
    }

    return false;
  }

  private getIndexFromArray(data: Base, datas: Base[]): number{
    for (let i: number = 0; i < datas.length; i++) {
      if (datas[i].id === data.id) {
        return i;
      }
    }

    return -1;
  }

  cancel() {
    
  }

  done() {
    if (!this.form.valid) { return; }
    console.log('done : ' + JSON.stringify(this.form.value));
  }
}
