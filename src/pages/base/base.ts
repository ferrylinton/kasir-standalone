import { TranslateService } from '@ngx-translate/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

import * as Constant from "../../constant/constant";
import * as Setting from '../../constant/setting';
import { SettingProvider } from '../../providers/setting/setting';
import { MessageProvider } from '../../providers/message/message';
import { User } from '../../models/user.model';


export abstract class BasePage {

    loadingTxt: string = 'Please wait...';

    unsaveOrderTxt: string = 'Order is not saved yet';

    orderTxt: string = 'Order';

    allCategoriesTxt: string = 'All Categories';

    modifyTxt: string = 'Modify';

    createTxt: string = 'Create';

    deleteTxt: string = 'Delete';

    saveTxt: string = 'Save';

    reloadPageTxt: string = 'Reload Page';

    lang: string = Setting.DEFAULT_LANGUAGE;

    currency: string = Setting.DEFAULT_CURRENCY + ' ';

    symbol: string = Setting.DEFAULT_CURRENCY_SYMBOL;

    loggedUser: User;

    constructor(
        public storage: Storage,
        public events: Events,
        public translateService: TranslateService,
        public settingProvider: SettingProvider,
        public messageProvider: MessageProvider
    ) {
        this.initLanguage();
        this.initSetting();
        this.storage.get(Constant.LOGGED_USER).then((value) => {
            this.loggedUser = JSON.parse(value);
        });
    }

    initLanguage() {
        let keys: string[] = [
            'LOADING',
            'UNSAVE_ORDER',
            'ORDER',
            'ALL_CATEGORIES',
            'CREATE',
            'MODIFY',
            'SAVE',
            'DELETE',
            'RELOAD_PAGE'
        ];

        this.translateService.get(keys).subscribe(values => {
            this.loadingTxt = values[keys[0]];
            this.unsaveOrderTxt = values[keys[1]];
            this.orderTxt = values[keys[2]];
            this.allCategoriesTxt = values[keys[3]];
            this.createTxt = values[keys[4]];
            this.modifyTxt = values[keys[5]];
            this.saveTxt = values[keys[6]];
            this.deleteTxt = values[keys[7]];
            this.reloadPageTxt = values[keys[8]];
        });
    }

    initSetting() {
        this.settingProvider.getLanguage().subscribe(setting => {
            this.lang = setting[Setting.LANGUAGE];
            this.currency = setting[Setting.CURRENCY] + ' ';
            this.symbol = setting[Setting.CURRENCY_SYMBOL];
        });
    }

    getLoggedUser(): Observable<User> {
        return fromPromise(this.storage.get(Constant.LOGGED_USER).then((value) => {
            return JSON.parse(value);
        }))
    }

    goToPage(page: string, params: any): void {
        this.events.publish(Constant.PAGE, { page: page, params: params });
    }

    reloadPage(page: string): void {
        this.messageProvider.showToast(this.reloadPageTxt);
        this.events.publish(Constant.PAGE, { page: page, params: {} });
    }
}