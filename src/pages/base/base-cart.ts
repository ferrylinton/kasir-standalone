import { CartProvider } from '../../providers/cart/cart';
import { Order } from "../../models/order.model";
import { Cart } from '../../models/cart.model';
import { Product } from '../../models/product.model';


export abstract class BaseCartPage {

    cart: Cart;

    error: string;

    constructor(public cartProvider: CartProvider) {
    }

    getProducts(order: Order): string {
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

    isSelected(product: Product): boolean {
        for (let i = 0; i < this.cart.order.items.length; i++) {
            if (this.cart.order.items[i].product.id === product.id) {
                return true;
            }
        }

        return false;
    }

    getQuantity(product: Product): number {
        for (let i = 0; i < this.cart.order.items.length; i++) {
            if (this.cart.order.items[i].product.id === product.id) {
                return this.cart.order.items[i].quantity;
            }
        }

        return 0;
    }

}