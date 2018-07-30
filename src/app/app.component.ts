import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, AlertController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { SettingProvider } from '../providers/setting/setting';

import { PAGE, LOGGED_USER } from '../constant/constant';
import { LANGUAGE } from '../constant/setting';
import { User } from '../models/user.model';
import { SchemaProvider } from '../providers/sqlite/schema';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  private LOGIN_PAGE: string = 'LoginPage';

  rootPage: any = this.LOGIN_PAGE;

  pages: Array<{ title: string, component: any }>;

  user: User;

  alertShown: boolean = false;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public alertCtrl: AlertController,
    public translate: TranslateService,
    public schemaProvider: SchemaProvider,
    public events: Events,
    public storage: Storage,
    public app: App,
    public settingProvider: SettingProvider) {

    this.initializeApp();
  }

  initializeApp() {
    this.initLang();
    this.initUser();
    this.initEvents();

    this.platform.ready().then(() => {
      this.statusBar.styleBlackOpaque();
      this.splashScreen.hide();

      // Handle Back Button
      this.platform.registerBackButtonAction(() => {
        let nav = this.app.getActiveNavs()[0];
        let activeView = nav.getActive();

        if (activeView != null) {
          if (nav.canGoBack()) {
            nav.pop();
          } else {
            if (this.alertShown == false) {
              this.presentConfirm();
            }
          }
        }
      });

      // Init Database
      this.schemaProvider.initDB()
    });
  }

  initLang() {
    this.translate.addLangs(['id', 'en']);
    this.translate.setDefaultLang(LANGUAGE);

    this.settingProvider.getSetting().subscribe(setting => {
      this.translate.use(setting.language);
    });

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.settingProvider.getSetting().subscribe(setting => {
        this.translate.use(setting.language);
      });
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
    if (this.user && this.user.role) {
      if (typeof this.user.role !== 'string') {
        for (let i: number = 0; i < this.user.role.authorities.length; i++) {
          if (authority == this.user.role.authorities[i].name) {
            return true;
          }
        }
      }
    }

    return true;
  }

  presentConfirm() {
    let keys: string[] = ['EXIT_MESSAGE', 'CANCEL', 'OK'];

    this.translate.get(keys).subscribe(values => {
      const alert = this.alertCtrl.create({
        cssClass: 'alert-not-title',
        message: values[keys[0]],
        buttons: [
          {
            text: values[keys[1]],
            role: 'cancel',
            handler: () => {
              this.alertShown = false;
            }
          },
          {
            text: values[keys[2]],
            handler: () => {
              this.platform.exitApp();
            }
          }
        ]
      });

      alert.present().then(() => {
        this.alertShown = true;
      });

    });
  }
}
