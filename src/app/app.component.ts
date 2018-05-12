import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { DEFAULT_LANGUAGE, MENU, FIRST_RUN_PAGE, DETAIL } from '../constant/constant';
import { Menu } from '../models/menu.model';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = FIRST_RUN_PAGE;

  menus: Array<Menu>;

  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public translate: TranslateService,
    public events: Events,
    public storage: Storage) {

    this.initializeApp();
  }

  initializeApp() {
    this.initLang();
    this.initMenus();
    this.initEvents();

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  initLang() {
    this.translate.setDefaultLang(DEFAULT_LANGUAGE);
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use(DEFAULT_LANGUAGE);
    }
  }

  initMenus(): void {
    this.storage.get(MENU).then((result) => {
      if (result) {
        this.menus = JSON.parse(result);
      }
    });


  }

  initEvents(): void {
    this.events.subscribe(MENU, menus => {
      this.menus = menus;
      this.storage.set(MENU, JSON.stringify(menus));
    });

    this.events.subscribe(DETAIL, page => {
      this.nav.setRoot(page);
    });
  }

  openPage(menu: Menu): void {
    if (menu.page === FIRST_RUN_PAGE) {
      this.nav.setRoot(FIRST_RUN_PAGE);
      this.storage.remove(MENU);
    } else {
      this.nav.setRoot(menu.page);
    }
  }

}
