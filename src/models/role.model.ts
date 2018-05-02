import { Audit } from './audit.model';
import { User } from './user.model';

export class Role implements Audit {

    constructor(

        public id?: string,

        public name?: string,

        public description?: string,

        public createdBy?: User,

        public createdDate?: Date,

        public lastModifiedBy?: User,

        public lastModifiedDate?: Date) {
    }

}