import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HOME_PAGE, LOGGED_USER } from '../../constant/constant';
import { LoginProvider } from '../../providers/login/login';

import { User } from '../../models/user.model';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private INVALID_USERNAME_PASSWORD: string;

  private EMPTY_USERNAME_PASSWORD: string;

  backgroundImage = 'assets/img/login-background.jpg';

  data = {username: '', password: ''};

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public events: Events,
    public storage: Storage,
    public loginProvider: LoginProvider) {

    this.initLang();
  }

  private initLang(): void {
    let lang: string[] = ['INVALID_USERNAME_PASSWORD', 'EMPTY_USERNAME_PASSWORD'];
    this.translateService.get(lang).subscribe((values) => {
      this.INVALID_USERNAME_PASSWORD = values[lang[0]];
      this.EMPTY_USERNAME_PASSWORD = values[lang[1]];
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

  login(): void {
    if(this.data.username === '' || this.data.password === ''){
      this.showMessage(this.EMPTY_USERNAME_PASSWORD);
    }else{
      this.loginProvider.login(this.data.username, this.data.password)
      .subscribe(user => {
        this.authenticate(user);
      });
    }
  }

  private authenticate(user: User): void {
    if (user != null && user.password === this.data.password) {
      this.events.publish(LOGGED_USER, user);
      this.storage.set(LOGGED_USER, JSON.stringify(user));
      this.navCtrl.setRoot(HOME_PAGE);
    } else {
      this.showMessage(this.INVALID_USERNAME_PASSWORD);
    }
  }

}
