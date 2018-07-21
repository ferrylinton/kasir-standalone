import { Base } from "../../models/base.model";
import { Page } from "../../models/page.model";
import { TranslateService } from "@ngx-translate/core";

export abstract class BasePage {

    page: Page<Base>;

    message: string;

    total: string;

    constructor(
        public translate: TranslateService
    ) {
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