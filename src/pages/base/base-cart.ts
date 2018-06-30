import { ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import * as Setting from '../../constant/setting';
import { CommonProvider } from '../../providers/common/common';
import { SettingProvider } from '../../providers/setting/setting';
import { CartProvider } from '../../providers/cart/cart';
import { Order } from "../../models/order.model";
import { Cart } from '../../models/cart.model';
import { Product } from '../../models/product.model';


export abstract class BaseCartPage {

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

    cart: Cart;

    constructor(
        public modalCtrl: ModalController,
        public translateService: TranslateService,
        public commonProvider: CommonProvider,
        public settingProvider: SettingProvider,
        public cartProvider: CartProvider,
    ) {
        this.initLanguage();
        this.initSetting();
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

    showOrder(order: Order) {
        const orderModal = this.modalCtrl.create('OrderModalPage', { order: order });
        orderModal.onDidDismiss(order => {
            if (order) {
                this.commonProvider.goToPage('OrderPage', { order: order });
            }
        })
        orderModal.present();
    }

    getProducts(order: Order): string {
        return this.commonProvider.getProductFromOrder(order);
    }

    addItem(product: Product): void {
        this.cartProvider.addItem(this.cart, product).subscribe(cart => {
            this.cart = cart;
        });
    }

    removeItem(product: Product): void {
        this.cartProvider.removeItem(this.cart, product).subscribe(cart => {
            this.cart = cart;
        });
    }

    getOperation(): string {
        return this.cart.isModified ? this.modifyTxt : this.addTxt;
    }

}