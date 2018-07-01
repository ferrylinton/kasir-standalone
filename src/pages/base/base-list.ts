import { ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { SettingProvider } from '../../providers/setting/setting';
import { MessageProvider } from '../../providers/message/message';
import { CrudProvider } from '../../providers/crud/crud';
import { BasePage } from './base';
import { Base } from '../../models/base.model';
import { Page } from '../../models/page.model';


export abstract class BaseListPage<T extends Base> extends BasePage {

    @ViewChild('searchbar') searchbar: any;

    showSearch: boolean = false;

    keyword: string = '';

    page: Page<T>;

    constructor(
        public storage: Storage,
        public events: Events,
        public translateService: TranslateService,
        public settingProvider: SettingProvider,
        public messageProvider: MessageProvider,
        public crudProvider: CrudProvider<T>,
        public sortBy: string
    ) {
        super(storage, events, translateService, settingProvider, messageProvider);
        this.initPage();
    }

    abstract loadData(): void;

    initPage(): void {
        this.page = new Page();
        this.page.sort.column = this.sortBy;
        this.page.sort.isAsc = true;
    }

    doInfinite(infiniteScroll) {
        this.page.pageNumber = this.page.pageNumber + 1;
        this.loadData();
        infiniteScroll.complete();
    }

    toggleSearch() {
        this.showSearch = !this.showSearch;
        if (this.showSearch) {
            setTimeout(() => {
                this.searchbar.setFocus();
            }, 100);
        }
    }

    clearSearch() {
        this.keyword = '';
        this.showSearch = false;
        this.initPage();
        this.loadData();
    }

    triggerSearch(ev: any) {
        this.keyword = ev.target.value;
        this.initPage();
        this.loadData();
    }

}