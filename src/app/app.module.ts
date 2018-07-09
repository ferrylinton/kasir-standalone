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
import { PipesModule } from '../pipes/pipes.module';
import { SQLite } from '@ionic-native/sqlite';

import { MyApp } from './app.component';

// Provider's Interface
import { LoginProvider } from '../providers/login/login';
import { AuthorityProvider } from '../providers/authority/authority';
import { RoleProvider } from '../providers/role/role';
import { UserProvider } from '../providers/user/user';
import { CategoryProvider } from '../providers/category/category';
import { ProductProvider } from '../providers/product/product';
import { OrderProvider } from '../providers/order/order';
import { CurrencyProvider } from '../providers/currency/currency';

// Provider's Implementation
import { AuthorityProviderImpl } from '../providers/sqlite/authority-impl';
import { RoleProviderImpl } from '../providers/sqlite/role-impl';
import { UserProviderImpl } from '../providers/sqlite/user-impl';
import { CategoryProviderImpl } from '../providers/sqlite/category-impl';
import { ProductProviderImpl } from '../providers/sqlite/product-impl';
import { OrderProviderImpl } from '../providers/sqlite/order-impl';
import { CurrencyProviderImpl } from '../providers/sqlite/currency-impl';

// Sqlite
import { SQLiteMock } from '../providers/sqlite/sqlite';
import { SchemaProvider } from '../providers/sqlite/schema';

import { UtilProvider } from '../providers/util/util';
import { SettingProvider } from '../providers/setting/setting';
import { MessageProvider } from '../providers/message/message';
import { CartProvider } from '../providers/cart/cart';
import { CommonProvider } from '../providers/common/common';

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
    }),
    PipesModule
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
    { provide: SQLite, useClass: SQLiteMock},
    { provide: AuthorityProvider, useClass: AuthorityProviderImpl },
    { provide: RoleProvider, useClass: RoleProviderImpl },
    { provide: UserProvider, useClass: UserProviderImpl },
    { provide: CategoryProvider, useClass: CategoryProviderImpl },
    { provide: ProductProvider, useClass: ProductProviderImpl },
    { provide: OrderProvider, useClass: OrderProviderImpl },
    { provide: CurrencyProvider, useClass: CurrencyProviderImpl },
    LoginProvider,
    UtilProvider,
    SettingProvider,
    MessageProvider,
    CartProvider,
    CommonProvider,
    SchemaProvider
  ]

})
export class AppModule { }
