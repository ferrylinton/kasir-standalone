import { Audit } from './audit.model';


export class Role implements Audit {

    constructor(

        public id?: string,

        public name?: string,

        public description?: string,

        public authorities?: string[],

        public createdBy?: string,

        public createdDate?: Date,

        public lastModifiedBy?: string,

        public lastModifiedDate?: Date) {
    }

}