import { Audit } from './audit.model';
import { OrderItem } from './order-item.model';

export class Order implements Audit {

    constructor(

        public id?: string,

        public transactionNumber?: string,

        public items?: Array<OrderItem>,

        public paid?: boolean,

        public canceled?: boolean,

        public createdBy?: string,

        public createdDate?: Date,

        public lastModifiedBy?: string,

        public lastModifiedDate?: Date) {
    }

}