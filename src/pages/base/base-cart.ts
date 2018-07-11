import { ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Events } from 'ionic-angular';

import { CommonProvider } from '../../providers/common/common';
import { SettingProvider } from '../../providers/setting/setting';
import { CartProvider } from '../../providers/cart/cart';
import { Order } from "../../models/order.model";
import { Cart } from '../../models/cart.model';
import { Product } from '../../models/product.model';
import { Setting } from '../../models/setting.model';
import { PAGE } from '../../constant/constant';


export abstract class BaseCartPage {

    loadingTxt: string = 'Please wait...';

    unsaveOrderTxt: string = 'Order is not saved yet';

    orderTxt: string = 'Order';

    allCategoriesTxt: string = 'All Categories';

    modifyTxt: string = 'Modify';

    addTxt: string = 'Add';

    deleteTxt: string = 'Delete';

    saveTxt: string = 'Save';

    setting: Setting;

    cart: Cart;

    constructor(
        public modalCtrl: ModalController,
        public translateService: TranslateService,
        public events: Events,
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
        this.settingProvider.getSetting().subscribe(setting => {
            this.setting = setting;
        });
    }

    showOrder(order: Order) {
        const orderModal = this.modalCtrl.create('OrderModalPage', { order: order });
        orderModal.onDidDismiss(order => {
            if (order) {
                this.events.publish(PAGE, { page: 'OrderPage', params: { order: order } });
            }
        })
        orderModal.present();
    }

    getProductFromOrder(order: Order): string{
        let result = '';
    
        if(order){
          for(let i=0; i<order.items.length; i++){
            let product: Product = order.items[i].product;
            result += i==0 ? product.name: ', ' + product.name;
          }
        }
        
        return result;
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