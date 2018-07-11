import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { SettingProvider } from '../providers/setting/setting';

import { PAGE, LOGGED_USER } from '../constant/constant';
import { LANGUAGE } from '../constant/setting';
import { User } from '../models/user.model';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  private LOGIN_PAGE: string = 'LoginPage';

  rootPage: any = this.LOGIN_PAGE;

  pages: Array<{ title: string, component: any }>;

  user: User;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public translate: TranslateService,
    public events: Events,
    public storage: Storage,
    public settingProvider: SettingProvider) {

    this.initializeApp();
  }

  initializeApp() {
    this.initLang();
    this.initUser();
    this.initEvents();

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  initLang() {
    this.translate.setDefaultLang(LANGUAGE);
    this.settingProvider.getSetting().subscribe(setting => {
      this.translate.use(setting.language);
    })
  }

  initUser(): void {
    this.storage.get(LOGGED_USER).then((result) => {
      if (result) {
        this.user = JSON.parse(result);
      }
    });
  }

  initEvents(): void {
    this.events.subscribe(LOGGED_USER, user => {
      this.user = user;
    });

    this.events.subscribe(PAGE, data => {
      this.nav.setRoot(data.page, data.params);
    });
  }

  openPage(page: string): void {
    if (page === this.LOGIN_PAGE) {
      this.nav.setRoot(this.LOGIN_PAGE);
      this.storage.remove(LOGGED_USER);
    } else {
      this.nav.setRoot(page);
    }
  }

  hasAuthority(authority: string): boolean {
    if (this.user && this.user.role ) {
      if(typeof this.user.role !== 'string'){
        for(let i:number = 0; i<this.user.role.authorities.length; i++){
          if(authority == this.user.role.authorities[i].name){
            return true;
          }
        }
      }
    }

    return true;
  }

}
