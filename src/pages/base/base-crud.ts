import { ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import * as Setting from '../../constant/setting';
import { CommonProvider } from '../../providers/common/common';
import { SettingProvider } from '../../providers/setting/setting';
import { CrudProvider } from '../../providers/crud/crud';
import { Base } from '../../models/base.model';
import { Page } from '../../models/page.model';


export abstract class BaseCrudPage<T extends Base> {

    loadingTxt: string = 'Please wait...';

    unsaveOrderTxt: string = 'Order is not saved yet';

    orderTxt: string = 'Order';

    allCategoriesTxt: string = 'All Categories';

    modifyTxt: string = 'Modify';

    addTxt: string = 'Add';

    deleteTxt: string = 'Delete';

    saveTxt: string = 'Save';

    lang: string = Setting.DEFAULT_LANGUAGE;

    currency: string = Setting.DEFAULT_CURRENCY + ' ';

    symbol: string = Setting.DEFAULT_CURRENCY_SYMBOL;

    page: Page<T>;

    constructor(
        public modalCtrl: ModalController,
        public translateService: TranslateService,
        public commonProvider: CommonProvider,
        public settingProvider: SettingProvider,
        public crudProvider: CrudProvider<T>,
        public sortBy: string,
    ) {
        this.initLanguage();
        this.initSetting();
        this.initPage();
    }

    initLanguage() {
        let keys: string[] = [
            'LOADING',
            'UNSAVE_ORDER',
            'ORDER',
            'ALL_CATEGORIES',
            'ADD',
            'EDIT',
            'SAVE',
            'DELETE'
        ];

        this.translateService.get(keys).subscribe(values => {
            this.loadingTxt = values[keys[0]];
            this.unsaveOrderTxt = values[keys[1]];
            this.orderTxt = values[keys[2]];
            this.allCategoriesTxt = values[keys[3]];
            this.addTxt = values[keys[4]];
            this.modifyTxt = values[keys[5]];
            this.saveTxt = values[keys[6]];
            this.deleteTxt = values[keys[7]];
        });
    }

    initSetting() {
        this.settingProvider.getLanguage().subscribe(setting => {
            this.lang = setting[Setting.LANGUAGE];
            this.currency = setting[Setting.CURRENCY] + ' ';
            this.symbol = setting[Setting.CURRENCY_SYMBOL];
        });
    }

    initPage(): void {
        this.page = new Page();
        this.page.sort.column = this.sortBy;
        this.page.sort.isAsc = true;
    }

    loadData() {
        this.crudProvider.find(this.page).subscribe(page => {
            this.page.pageNumber = page.pageNumber;
            this.page.totalData = page.totalData;
            this.page.data = [...this.page.data, ...page.data];
        })
    }

    doInfinite(infiniteScroll) {
        this.page.pageNumber = this.page.pageNumber + 1;
        this.loadData();
        infiniteScroll.complete();
    }

}