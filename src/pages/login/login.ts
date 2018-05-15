import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, Events } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { MENU, HOME_PAGE, LOGGED_USER } from '../../constant/constant';
import { LoginProvider } from '../../providers/login/login';
import { MenuProvider } from '../../providers/menu/menu';

import { Login } from '../../models/login.model';
import { User } from '../../models/user.model';
import { Menu } from '../../models/menu.model';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private invalidUsernamePassword: string;

  private emptyUsernamePassword: string;

  private login: Login = new Login('', '');

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public events: Events,
    public storage: Storage,
    public loginProvider: LoginProvider,
    public menuProvider: MenuProvider) {

    this.initLang();
  }

  onLogin(form: NgForm) {
    if (form.valid) {
      this.doLogin();
    } else {
      this.showMessage(this.emptyUsernamePassword);
    }
  }

  private initLang(): void {
    this.translateService.get(['MESSAGE.INVALID_USERNAME_PASSWORD', 'MESSAGE.EMPTY_USERNAME_PASSWORD']).subscribe((values) => {
      this.invalidUsernamePassword = values['MESSAGE.INVALID_USERNAME_PASSWORD'];
      this.emptyUsernamePassword = values['MESSAGE.EMPTY_USERNAME_PASSWORD'];
    });
  }

  private showMessage(txt: string): void {
    let toast = this.toastCtrl.create({
      message: txt,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  private doLogin(): void {
    this.loginProvider.doLogin(this.login)
      .subscribe(result => {
        this.authenticate(result[0], result[1]);
      });
  }

  private authenticate(user: User, menus: Menu[]): void {
    if (user != null && user.password === this.login.password) {
      this.storage.set(LOGGED_USER, JSON.stringify(user));
      this.menuProvider.build(menus, user.authorities).subscribe(result => {
        this.events.publish(MENU, result);
      })
      this.navCtrl.setRoot(HOME_PAGE);
    } else {
      this.showMessage(this.invalidUsernamePassword);
    }
  }

}
