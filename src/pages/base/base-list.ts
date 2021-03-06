import { LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { ViewChild } from '@angular/core';

import { BasePage } from './base-page';
import { Base } from '../../models/base.model';
import { Page } from '../../models/page.model';


export abstract class BaseListPage<T extends Base> extends BasePage{

    @ViewChild('searchbar') searchbar: any;

    showSearch: boolean = false;

    keyword: string = '';

    page: Page<T>;

    constructor(
        public loadingCtrl: LoadingController,
        public translate: TranslateService
    ) {
        super(loadingCtrl, translate);
    }

    abstract loadData(): void;

    initPage(): void {
        this.page = new Page();
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