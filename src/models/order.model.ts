import { Audit } from './audit.model';
import { Item } from './item.model';

export class Order implements Audit {

    constructor(

        public id?: string,

        public items?: Item[],

        public createdBy?: string,

        public createdDate?: Date,

        public lastModifiedBy?: string,

        public lastModifiedDate?: Date) {
    }

}