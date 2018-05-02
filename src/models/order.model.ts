import { Audit } from './audit.model';
import { User } from './user.model';
import { Product } from './product.model';

export class Order implements Audit {

    constructor(

        public id?: string,

        public transactionNumber?: string,

        public products?: Product[],

        public createdBy?: User,

        public createdDate?: Date,

        public lastModifiedBy?: User,

        public lastModifiedDate?: Date) {
    }

}