import { Base } from "../../models/base.model";
import { Page } from "../../models/page.model";
import { TranslateService } from "@ngx-translate/core";

export abstract class BasePage {

    page: Page<Base>;

    message: string;

    constructor(public translate: TranslateService) {
    }

    setPage(page: Page<Base>): void {
        this.page.pageNumber = page.pageNumber;
        this.page.totalData = page.totalData;
        this.page.data = [...this.page.data, ...page.data];
        this.setMessage(page);
    }

    setMessage(page: Page<Base>): void {
        if (page.totalData == 0) {
            this.translate.get('NO_DATA').subscribe(value => {
                this.message = value;
            });
        }
    }

    handleError(error: any) : void{
        this.message = 'Error : ' + error;
    }
    
}