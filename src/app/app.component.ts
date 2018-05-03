import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthorityProvider } from '../providers/authority/authority';
import { RoleProvider } from '../providers/role/role';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

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
    public roleProvider: RoleProvider) {

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
      .forEach(authority => {
        console.log(JSON.stringify(authority));
      })
      .catch(error => {
        console.log(error);
        throw (error.message || error);
      });

      console.log('roleProvider.findAll() -----------------------------');
      this.roleProvider.findAll()
        .forEach(role => {
          console.log(JSON.stringify(role));
        })
        .catch(error => {
          console.log(error);
          throw (error.message || error);
        });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
