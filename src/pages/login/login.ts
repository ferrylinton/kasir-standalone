import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, Events, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LOGGED_USER } from '../../constant/constant';
import { UserProvider } from '../../providers/user/user';
import { OpenPGPProvider } from '../../providers/openpgp/openpgp';
import { SchemaProvider } from '../../providers/sqlite/schema';

import { User } from '../../models/user.model';




@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private INVALID_USERNAME_PASSWORD: string;

  private EMPTY_USERNAME_PASSWORD: string;

  private CHECKING_DB: string;

  backgroundImage = 'assets/img/login-background.jpg';

  data = { username: '', password: '' };

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public translateService: TranslateService,
    public events: Events,
    public storage: Storage,
    public userProvider: UserProvider,
    public openPGPProvider: OpenPGPProvider,
    public schemaProvider: SchemaProvider) {
  }

  ionViewWillEnter() {
    this.initLang();
    this.initDB();
  }

  private initLang(): void {
    let lang: string[] = ['INVALID_USERNAME_PASSWORD', 'EMPTY_USERNAME_PASSWORD', 'CHECKING_DB'];

    this.translateService.get(lang).subscribe((values) => {
      this.INVALID_USERNAME_PASSWORD = values[lang[0]];
      this.EMPTY_USERNAME_PASSWORD = values[lang[1]];
      this.CHECKING_DB = values[lang[2]];
    });
  }

  private initDB(): void {
    let loading = this.loadingCtrl.create({ content: this.CHECKING_DB });
    loading.present();

    this.schemaProvider.initDB().subscribe(result => {
      console.log('LoginPage -> initDB :: ' + JSON.stringify(result));
      loading.dismiss();
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
    if (this.data.username === '' || this.data.password === '') {
      this.showMessage(this.EMPTY_USERNAME_PASSWORD);
    } else {
      this.userProvider.findByUsername(this.data.username).subscribe(user => {
        if (user != null) {
          this.openPGPProvider.decryptWithPassword(user.password).then(result => {
            if (this.data.password == result) {
              this.events.publish(LOGGED_USER, user);
              this.storage.set(LOGGED_USER, JSON.stringify(user));
              this.navCtrl.setRoot('HomePage');
            } else {
              this.showMessage(this.INVALID_USERNAME_PASSWORD);
            }
          }).catch(error => {
            this.showMessage(this.INVALID_USERNAME_PASSWORD);
          })
        } else {
          this.showMessage(this.INVALID_USERNAME_PASSWORD);
        }
      }, error => {
        this.showMessage(this.INVALID_USERNAME_PASSWORD);
      });
    }
  }
}
