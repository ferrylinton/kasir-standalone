import { Audit } from './audit.model';
import { Authority } from './authority.model';


export class Role implements Audit {

    constructor(

        public id?: string,

        public name?: string,

        public description?: string,

        public authorities?: Array<Authority>,

        public createdBy?: string,

        public createdDate?: Date,

        public lastModifiedBy?: string,

        public lastModifiedDate?: Date) {
    }

}