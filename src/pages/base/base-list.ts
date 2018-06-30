import { TranslateService } from '@ngx-translate/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

import * as Constant from "../../constant/constant";
import * as Setting from '../../constant/setting';
import { SettingProvider } from '../../providers/setting/setting';
import { MessageProvider } from '../../providers/message/message';
import { CrudProvider } from '../../providers/crud/crud';
import { BasePage } from './base';
import { Base } from '../../models/base.model';
import { Page } from '../../models/page.model';


export abstract class BaseListPage<T extends Base> extends BasePage {

    page: Page<T>;

    sortBy: string = 'id';

    constructor(
        public storage: Storage,
        public events: Events,
        public translateService: TranslateService,
        public settingProvider: SettingProvider,
        public messageProvider: MessageProvider,
        public crudProvider: CrudProvider<T>
    ) {
        super(storage, events, translateService, settingProvider, messageProvider);
        this.initPage();
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