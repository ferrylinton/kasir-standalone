import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, Events, LoadingController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LOGGED_USER } from '../../constant/constant';
import { UserProvider } from '../../providers/user/user';
import { OpenPGPProvider } from '../../providers/openpgp/openpgp';
import { MessageProvider } from '../../providers/message/message';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private INVALID_USERNAME_PASSWORD: string;

  private EMPTY_USERNAME_PASSWORD: string;

  backgroundImage = 'assets/img/login-background.jpg';

  data = { username: '', password: '' };

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public translateService: TranslateService,
    public events: Events,
    public storage: Storage,
    public userProvider: UserProvider,
    public openPGPProvider: OpenPGPProvider,
    public messageProvider: MessageProvider,
    public platform: Platform) {
  }

  ionViewWillEnter() {
    this.initLang();
  }

  private initLang(): void {
    let lang: string[] = ['INVALID_USERNAME_PASSWORD', 'EMPTY_USERNAME_PASSWORD'];

    this.translateService.get(lang).subscribe((values) => {
      this.INVALID_USERNAME_PASSWORD = values[lang[0]];
      this.EMPTY_USERNAME_PASSWORD = values[lang[1]];
    });
  }

  login(): void {
    if (this.data.username === '' || this.data.password === '') {
      this.messageProvider.toast(this.EMPTY_USERNAME_PASSWORD);
    } else {
      this.userProvider.findByUsername(this.data.username).subscribe(user => {
        if (user != null) {
          this.openPGPProvider.decryptWithPassword(user.password).then(result => {
            if (this.data.password == result) {
              this.events.publish(LOGGED_USER, user);
              this.storage.set(LOGGED_USER, JSON.stringify(user));
              this.navCtrl.setRoot('HomePage');
            } else {
              this.messageProvider.toast(this.INVALID_USERNAME_PASSWORD);
            }
          }).catch(error => {
            this.messageProvider.toast(error.message);
          })
        } else {
          this.messageProvider.toast(this.INVALID_USERNAME_PASSWORD);
        }
      }, error => {
        this.messageProvider.toast(error.message);
      });
    }
  }
}
