import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthorityProvider } from '../providers/authority/authority';
import { RoleProvider } from '../providers/role/role';
import { UserProvider } from '../providers/user/user';
import { MenuProvider } from '../providers/menu/menu';
import { LoginProvider } from '../providers/login/login';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Login } from '../models/login.model';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public authorityProvider: AuthorityProvider,
    public roleProvider: RoleProvider,
    public userProvider: UserProvider,
    public menuProvider: MenuProvider,
    public loginProvider: LoginProvider) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    console.log('authorityProvider.findAll() -----------------------------');
    this.authorityProvider.findAll()
      .forEach(authorities => {
        console.log(JSON.stringify(authorities));
      })
      .catch(error => {
        console.log(error);
        throw (error.message || error);
      });

    console.log('roleProvider.findAll() -----------------------------');
    this.roleProvider.findAll()
      .forEach(roles => {
        console.log(JSON.stringify(roles));
      })
      .catch(error => {
        console.log(error);
        throw (error.message || error);
      });

    console.log('userProvider.findAll() -----------------------------');
    this.userProvider.findAll()
      .forEach(users => {
        console.log(JSON.stringify(users));
      })
      .catch(error => {
        console.log(error);
        throw (error.message || error);
      });

    console.log('userProvider.findByUsername() -----------------------------');
    this.userProvider.findByUsername('adminv')
      .subscribe(user => {
        console.log(JSON.stringify(user));
      });

    console.log('menuProvider.findAll() -----------------------------');
    this.menuProvider.findAll()
      .subscribe(menus => {
        console.log(JSON.stringify(menus));
      });

    console.log('loginProvider.doLogin() -----------------------------');
    //console.log(JSON.stringify(this.loginProvider.doLogin(new Login('admin', 'password'))));
    this.loginProvider.doLogin(new Login('admin', 'password'))
      .subscribe(result => {
        console.log(JSON.stringify(result[0]));
        console.log(JSON.stringify(result[1]));
      });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
