import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { SettingProvider } from '../providers/setting/setting';

import { MENU, FIRST_RUN_PAGE, PAGE, LOGGED_USER } from '../constant/constant';
import { DEFAULT_LANGUAGE } from '../constant/setting';
import { Menu } from '../models/menu.model';
import { User } from '../models/user.model';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = FIRST_RUN_PAGE;

  menus: Array<Menu>;

  pages: Array<{ title: string, component: any }>;

  user: User;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public translate: TranslateService,
    public events: Events,
    public storage: Storage,
    public setting: SettingProvider) {

    this.initializeApp();
  }

  initializeApp() {
    this.initLang();
    this.initMenus();
    this.initUser();
    this.initEvents();

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  initLang() {
    this.translate.setDefaultLang(DEFAULT_LANGUAGE);
    this.setting.getLanguage().subscribe(language => {
      this.translate.use(language);
    })
  }

  initMenus(): void {
    this.storage.get(MENU).then((result) => {
      if (result) {
        this.menus = JSON.parse(result);
      }
    });
  }

  initUser(): void {
    this.storage.get(LOGGED_USER).then((result) => {
      if (result) {
        this.user = JSON.parse(result);
      }
    });
  }

  initEvents(): void {
    this.events.subscribe(MENU, menus => {
      this.menus = menus;
      this.storage.set(MENU, JSON.stringify(menus));
    });

    this.events.subscribe(LOGGED_USER, user => {
      console.log('user : ' + user.username);
      this.user = user;
    });

    this.events.subscribe(PAGE, data => {
      this.nav.setRoot(data.page, data.params);
    });
  }

  openPage(page: string): void {
    if (page === FIRST_RUN_PAGE) {
      this.nav.setRoot(FIRST_RUN_PAGE);
      this.storage.remove(MENU);
      this.storage.remove(LOGGED_USER);
    } else {
      this.nav.setRoot(page);
    }
  }

}
