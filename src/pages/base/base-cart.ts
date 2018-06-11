import { ModalController, Loading, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import * as Setting from '../../constant/setting';
import { CommonProvider } from '../../providers/common/common';
import { SettingProvider } from '../../providers/setting/setting';
import { CartProvider } from '../../providers/cart/cart';
import { Order } from "../../models/order.model";
import { Cart } from '../../models/cart.model';
import { Product } from '../../models/product.model';


export abstract class BaseCart {

    loadingTxt: string = 'Please wait...';

    orderTxt: string = 'Order';

    gridTxt: string = 'Grid';

    listTxt: string = 'List';

    allCategoriesTxt: string = 'All Categories';

    lang: string = Setting.DEFAULT_LANGUAGE;

    currency: string = Setting.DEFAULT_CURRENCY + ' ';

    symbol: string = Setting.DEFAULT_CURRENCY_SYMBOL;

    loading: Loading;

    cart: Cart;

    constructor(
        public modalCtrl: ModalController,
        public loadingCtrl: LoadingController,
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
            'MESSAGE.LOADING',
            'LABEL.ORDER',
            'LABEL.GRID',
            'LABEL.LIST',
            'LABEL.ALL_CATEGORIES'
        ];

        this.translateService.get(keys).subscribe(val => {
            this.loadingTxt = val[keys[0]];
            this.orderTxt = val[keys[1]];
            this.gridTxt = val[keys[2]];
            this.listTxt = val[keys[3]];
            this.allCategoriesTxt = val[keys[4]];
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

    startLoading(): void {
        this.loading = this.loadingCtrl.create({
            content: this.loadingTxt
        });
        this.loading.present();
    }

    getProducts(order: Order): string {
        return this.commonProvider.getProductFromOrder(order);
    }

    addItem(product: Product): void {
        this.cartProvider.addItem(product).subscribe(order => {
          this.cartProvider.getCart(order).subscribe(cart => {
            this.cart = cart;
          })
        })
      }
    
      removeItem(product: Product): void {
        this.cartProvider.removeItem(product).subscribe(order => {
          this.cartProvider.getCart(order).subscribe(cart => {
            this.cart = cart;
          })
        })
      }

}