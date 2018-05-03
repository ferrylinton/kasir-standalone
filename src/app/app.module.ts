import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthorityProvider } from '../providers/authority/authority';
import { AuthorityMockProvider } from '../providers/authority/authority-mock';
import { RoleProvider } from '../providers/role/role';
import { RoleMockProvider } from '../providers/role/role-mock';
import { UserProvider } from '../providers/user/user';
import { UserMockProvider } from '../providers/user/user-mock';
import { CategoryProvider } from '../providers/category/category';
import { CategoryMockProvider } from '../providers/category/category-mock';
import { LoginProvider } from '../providers/login/login';
import { MenuProvider } from '../providers/menu/menu';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: CategoryProvider, useClass: CategoryMockProvider },
    { provide: AuthorityProvider, useClass: AuthorityMockProvider },
    { provide: RoleProvider, useClass: RoleMockProvider },
    { provide: UserProvider, useClass: UserMockProvider },
    LoginProvider,
    MenuProvider
  ]
})
export class AppModule { }
