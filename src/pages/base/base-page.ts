import { Loading, LoadingController } from "ionic-angular";
import { TranslateService } from "@ngx-translate/core";

import { Base } from "../../models/base.model";
import { Page } from "../../models/page.model";


export abstract class BasePage {

    loading: Loading;

    isLoading: boolean = false;

    isStopLoading: boolean = false;

    page: Page<Base>;

    message: string;

    total: string;

    constructor(
        public loadingCtrl: LoadingController,
        public translate: TranslateService
    ) {
    }

    startLoading(): void {
        if (!this.loading && !this.isLoading) {
            this.translate.get('LOADING').subscribe(value => {
                this.loading = this.loadingCtrl.create({ content: value });
                this.isLoading = true;
                this.loading.present();
            });
        }
    }

    stopLoading(): void {
        if (!this.isStopLoading && this.loading && this.isLoading) {
            this.isStopLoading = true;
            //setTimeout(() => {
                this.loading.dismiss().then(res => {
                    this.loading = null;
                    this.isLoading = false;
                    this.isStopLoading = false;
                });
            //}, 500);
        }
    }

    setPage(page: Page<Base>): void {
        this.page.pageNumber = page.pageNumber;
        this.page.totalData = page.totalData;
        this.page.data = [...this.page.data, ...page.data];
        this.setMessage(this.page);
    }

    setMessage(page: Page<Base>): void {
        if (page.totalData == 0) {
            this.total = null;
            this.translate.get('NO_DATA').subscribe(value => {
                this.message = value;
            });
        } else {
            this.message = null;
            this.translate.get('TOTAL_OF', { number: page.data.length, total: page.totalData }).subscribe(value => {
                this.total = value;
            });
        }
    }

}