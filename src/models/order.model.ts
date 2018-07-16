import { Audit } from './audit.model';
import { OrderItem } from './order-item.model';
import { User } from './user.model';

export class Order implements Audit {

    constructor(

        public id?: string,

        public transactionNumber?: string,

        public orderItems?: Array<OrderItem>,

        public paid?: boolean,

        public canceled?: boolean,

        public note?: string,

        public createdBy?: string | User,

        public createdDate?: Date,

        public lastModifiedBy?: string | User,

        public lastModifiedDate?: Date) {
    }

}