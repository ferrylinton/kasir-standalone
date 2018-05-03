import { Audit } from './audit.model';
import { Authority } from './authority.model';
import { User } from './user.model';

export class Role implements Audit {

    constructor(

        public id?: string,

        public name?: string,

        public description?: string,

        public authorities?: Authority[],

        public createdBy?: User,

        public createdDate?: Date,

        public lastModifiedBy?: User,

        public lastModifiedDate?: Date) {
    }

}