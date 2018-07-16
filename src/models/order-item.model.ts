import { Base } from './base.model';
import { Product } from './product.model';

export class OrderItem implements Base{
    
    constructor(

        public id: string,

        public quantity: number,

        public price: number, 

        public product: Product,

        public note: string

        ){
    }
    
}