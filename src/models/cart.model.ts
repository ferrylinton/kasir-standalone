import { Order } from './order.model';

export class Cart {

    constructor(

        public order?: Order,

        public totalItem?: number,

        public totalPrice?: number) {
    }

}