import { ModalController, Loading, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { CommonProvider } from '../../providers/common/common';
import { UtilProvider } from '../../providers/util/util';
import { SettingProvider } from '../../providers/setting/setting';
import { LOGGED_USER, ORDER } from "../../constant/constant";
import { DEFAULT_LANGUAGE } from '../../constant/setting';
import { Order } from "../../models/order.model";


export abstract class BaseCart {

    loadingTxt: string = 'Please wait...';

    lang: string = DEFAULT_LANGUAGE;

    loading: Loading;

    constructor(
        public modalCtrl: ModalController,
        public loadingCtrl: LoadingController,
        public translateService: TranslateService,
        public commonProvider: CommonProvider,
        public settingProvider: SettingProvider
    ) {
    }

    initLanguage() {
        this.translateService.get('MESSAGE.LOADING').subscribe(val => {
            this.loadingTxt = val;
        });
    }

    initSetting() {
        this.settingProvider.getLanguage().subscribe(lang => {
            this.lang = lang;
        });
    }

    showOrder(order: Order) {
        const orderModal = this.modalCtrl.create('OrderModalPage', { order: order });
        orderModal.onDidDismiss(order => {
            if (order) {
                this.commonProvider.goToPage('OrderPage', { order: order });
            }
        })
        orderModal.present();
    }

    startLoading(): void {
        this.loading = this.loadingCtrl.create({
            content: this.loadingTxt
        });
        this.loading.present();
    }

    getProducts(order: Order): string {
        return this.commonProvider.getProductFromOrder(order);
    }

}