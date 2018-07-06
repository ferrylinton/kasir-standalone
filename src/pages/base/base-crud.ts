import { ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';


import { CommonProvider } from '../../providers/common/common';
import { SettingProvider } from '../../providers/setting/setting';
import { CrudProvider } from '../../providers/crud/crud';
import { Setting } from '../../models/setting.model';
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

    setting: Setting;

    page: Page<T>;

    constructor(
        public modalCtrl: ModalController,
        public translateService: TranslateService,
        public commonProvider: CommonProvider,
        public settingProvider: SettingProvider,
        public crudProvider: CrudProvider<T>,
        public sortBy: string,
    ) {
    }

    abstract loadData(): void;

    init(): void {
        this.settingProvider.getSetting().subscribe(setting => {
            this.setting = setting;
            this.initLanguage();
            this.initPage();
            this.loadData();
        });
    }

    initLanguage(): void {
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

    initPage(): void {
        this.page = new Page();
        this.page.sort.column = this.sortBy;
        this.page.sort.isAsc = true;
    }

    doInfinite(infiniteScroll): void {
        this.page.pageNumber = this.page.pageNumber + 1;
        this.loadData();
        infiniteScroll.complete();
    }

}