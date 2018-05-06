import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, Events } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { LoginProvider } from '../../providers/login/login';
import { Login } from '../../models/login.model';
import { User } from '../../models/user.model';
import { Menu } from '../../models/menu.model';
import { MENU, HOME_PAGE } from '../../constant/constant';

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
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private translateService: TranslateService,
    private events: Events,
    private loginProvider: LoginProvider) {

    console.log('LoginPage -> constructor()');
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
    this.translateService.get(['ERROR.INVALID_USERNAME_PASSWORD', 'ERROR.EMPTY_USERNAME_PASSWORD']).subscribe((values) => {
      this.invalidUsernamePassword = values['ERROR.INVALID_USERNAME_PASSWORD'];
      this.emptyUsernamePassword = values['ERROR.EMPTY_USERNAME_PASSWORD'];
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
        let user: User = result[0];
        let menus: Menu[] = result[1];

        if (user != null && user.password === this.login.password) {
          this.events.publish(MENU, menus);
          this.navCtrl.setRoot(HOME_PAGE);
        } else {
          this.showMessage(this.invalidUsernamePassword);
        }
      });
  }

}
