import { SettingProvider } from '../../providers/setting/setting';
import { CartProvider } from '../../providers/cart/cart';
import { Order } from "../../models/order.model";
import { Cart } from '../../models/cart.model';
import { Product } from '../../models/product.model';
import { Setting } from '../../models/setting.model';


export abstract class BaseCartPage {

    setting: Setting;

    cart: Cart;

    constructor(
        public settingProvider: SettingProvider,
        public cartProvider: CartProvider,
    ) {
        this.initSetting();
    }


    initSetting() {
        this.settingProvider.getSetting().subscribe(setting => {
            this.setting = setting;
        });
    }

    getProductFromOrder(order: Order): string {
        let result = '';

        if (order) {
            for (let i = 0; i < order.items.length; i++) {
                let product: Product = order.items[i].product;
                result += i == 0 ? product.name : ', ' + product.name;
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

}