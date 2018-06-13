import { Order } from './order.model';

export class Cart {

    constructor(

        public order: Order,

        public totalItem: number = 0,

        public totalPrice: number = 0,

        public isModified: boolean = false) {
    }

}