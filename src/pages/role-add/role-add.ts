import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Events } from 'ionic-angular';
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
  selector: 'page-role-add',
  templateUrl: 'role-add.html',
})
export class RoleAddPage extends BasePage {

  authorities: Authority[];

  isReadyToSave: boolean;

  form: FormGroup;

  role: Role;

  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public translate: TranslateService,
    public storage: Storage,
    public events: Events,
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public authorityProvider: AuthorityProvider,
    public roleProvider: RoleProvider) {

    super(toastCtrl, alertCtrl, translate, storage, events);
    this.init(navParams);
  }

  private init(navParams: NavParams): void {
    this.role = navParams.get('role');

    if (this.role === undefined) {
      this.reloadPage('RolePage');
    } else {
      this.initAuthorities();
      this.initForm();

      this.form.valueChanges.subscribe((v) => {
        this.isReadyToSave = this.form.valid;
      });
    }
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
        name: [authority.name],
        description: [authority.description],
        checked: [false]
      });
    }));

    this.form = this.formBuilder.group({
      id: [this.role.id],
      name: [this.role.name, Validators.required],
      description: [this.role.description],
      authorities: authorityControlArray
    });

  }

  private convertToAuthorities(): string[] {
    let authorities: string[] = new Array<string>();
    for (let i: number = 0; i < this.form.value.authorities.length; i++) {
      if (this.form.value.authorities[i].checked) {
        let authority = this.form.value.authorities[i];
        authorities.push(authority.name);
      }
    }

    return authorities;
  }

  saveCallback(role: Role): void {
    role.createdBy = this.loggedUser.username;
    role.createdDate = new Date();
    role.authorities = this.convertToAuthorities();
    this.roleProvider.save(role).subscribe(result => {
      this.navCtrl.popToRoot();
      this.showToast(result.name);
    });
  }

  save() {
    if (!this.form.valid) {
      return;
    } else {
      this.showAddConfirm(this.form.value.name, (role) => this.saveCallback(this.form.value));
    }
  }

}
