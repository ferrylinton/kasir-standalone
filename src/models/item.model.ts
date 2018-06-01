import { Base } from './base.model';
import { Product } from './product.model';

export class Item implements Base{
    
    constructor(

        public id: string,

        public product: Product,

        public quantity: number){
    }
    
}