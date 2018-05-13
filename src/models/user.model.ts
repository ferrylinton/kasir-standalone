import { Audit } from './audit.model';
import { Role } from './role.model';

export class User implements Audit{

    constructor(

        public id?: string,

        public username?: string, 
        
        public password?: string, 
        
        public fullname?: string, 
        
        public role?: Role, 
        
        public activated?: boolean,

        public createdBy?: User,

        public createdDate?: Date,

        public lastModifiedBy?: User,

        public lastModifiedDate?: Date) {
    }

}