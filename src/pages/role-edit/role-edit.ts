import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Role } from '../../models/role.model';
import { Authority } from '../../models/authority.model';
import { AuthorityProvider } from '../../providers/authority/authority';
import { RoleProvider } from '../../providers/role/role';
import { Storage } from '@ionic/storage';
import { BasePage } from '../base/base';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-role-edit',
  templateUrl: 'role-edit.html',
})
export class RoleEditPage extends BasePage {

  authorities: Authority[];

  isReadyToSave: boolean;

  form: FormGroup;

  role: Role;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public translate: TranslateService,
    public storage: Storage,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public authorityProvider: AuthorityProvider,
    public roleProvider: RoleProvider) {

    super(toastCtrl, alertCtrl, translate, storage);
    this.initRole(navParams);
    this.initAuthorities();
    this.initForm();

    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoleAddPage');
  }

  private initRole(navParams: NavParams): void {
    this.role = navParams.get('role');
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
        description: [authority.description],
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
        let authority = this.form.value.authorities[i];
        authorities.push(new Authority(authority.id, authority.name, authority.description));
      }
    }

    return authorities;
  }

  saveCallback(role: Role): void {
    role.lastModifiedBy = this.loggedUser;
    role.lastModifiedDate = new Date();
    role.authorities = this.convertToAuthorities();
    this.roleProvider.update(role).subscribe(result => {
      this.navCtrl.popToRoot();
      this.showToast(result.name);
    });
  }

  save() {
    if (!this.form.valid) {
      return;
    } else {
      this.showDeleteConfirm(this.form.value.name, (role) => this.saveCallback(this.form.value));
    }
  }

}
