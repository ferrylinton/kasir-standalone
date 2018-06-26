import { Audit } from './audit.model';
import { Item } from './item.model';

export class Order implements Audit {

    constructor(

        public id?: string,

        public transactionNumber?: string,

        public items?: Item[],

        public isPaid?: boolean,

        public isCanceled?: boolean,

        public createdBy?: string,

        public createdDate?: Date,

        public lastModifiedBy?: string,

        public lastModifiedDate?: Date) {
    }

}