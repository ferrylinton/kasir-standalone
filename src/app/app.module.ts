import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';

import { AuthorityProvider } from '../providers/authority/authority';
import { AuthorityMockProvider } from '../providers/authority/authority-mock';

import { RoleProvider } from '../providers/role/role';
import { RoleMockProvider } from '../providers/role/role-mock';

import { UserProvider } from '../providers/user/user';
import { UserMockProvider } from '../providers/user/user-mock';

import { MenuProvider } from '../providers/menu/menu';
import { MenuMockProvider } from '../providers/menu/menu-mock';

import { LoginProvider } from '../providers/login/login';
import { LoginMockProvider } from '../providers/login/login-mock';

import { CategoryProvider } from '../providers/category/category';
import { CategoryMockProvider } from '../providers/category/category-mock';

import { ProductProvider } from '../providers/product/product';
import { ProductMockProvider } from '../providers/product/product-mock';

import { OrderProvider } from '../providers/order/order';
import { OrderMockProvider } from '../providers/order/order-mock';

import { DataProvider } from '../providers/data/data';
import { UtilProvider } from '../providers/util/util';


registerLocaleData(localeId, 'id');

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: 'minishopdb',
         driverOrder: ['indexeddb', 'websql', 'sqlite']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: AuthorityProvider, useClass: AuthorityMockProvider },
    { provide: RoleProvider, useClass: RoleMockProvider },
    { provide: UserProvider, useClass: UserMockProvider },
    { provide: MenuProvider, useClass: MenuMockProvider },
    { provide: LoginProvider, useClass: LoginMockProvider },
    { provide: CategoryProvider, useClass: CategoryMockProvider },
    { provide: ProductProvider, useClass: ProductMockProvider },
    { provide: OrderProvider, useClass: OrderMockProvider },
    DataProvider,
    UtilProvider
  ]

})
export class AppModule { }
