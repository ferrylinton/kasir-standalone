import { Audit } from './audit.model';
import { Product } from './product.model';

export class Order implements Audit {

    constructor(

        public id?: string,

        public transactionNumber?: string,

        public products?: Product[],

        public createdBy?: string,

        public createdDate?: Date,

        public lastModifiedBy?: string,

        public lastModifiedDate?: Date) {
    }

}