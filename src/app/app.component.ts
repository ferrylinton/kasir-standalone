import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { SettingProvider } from '../providers/setting/setting';

import { FIRST_RUN_PAGE, PAGE, LOGGED_USER } from '../constant/constant';
import { LANGUAGE } from '../constant/setting';
import { User } from '../models/user.model';
import { TableProvider } from '../providers/table/table';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = FIRST_RUN_PAGE;

  pages: Array<{ title: string, component: any }>;

  user: User;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public translate: TranslateService,
    public events: Events,
    public storage: Storage,
    public settingProvider: SettingProvider,
    public tableProvider: TableProvider) {

    this.initializeApp();

    //let db = openDatabase('mydb', '1.0', 'my first database', 2 * 1024 * 1024);
    // let db = (<any>window).openDatabase('xshop', '2.0', 'xshop db for testing', 2 * 1024 * 1024);
    // db.transaction(function (tx) {
    //   tx.executeSql("CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
    // });

    tableProvider.createTables().then((data) => {
      console.log(JSON.stringify(data));
    }).catch((error) => {
      console.log('app : ' + error);
      console.log('app : ' + JSON.stringify(error));
    });
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
    if (page === FIRST_RUN_PAGE) {
      this.nav.setRoot(FIRST_RUN_PAGE);
      this.storage.remove(LOGGED_USER);
    } else {
      this.nav.setRoot(page);
    }
  }

  hasAuthority(authority: string): boolean {
    if (this.user) {
      return this.user.authorities.indexOf(authority) > -1;
    }

    return false;
  }

}
