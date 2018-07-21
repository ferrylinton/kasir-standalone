import { Audit } from './audit.model';
import { Role } from './role.model';


export class User implements Audit{

    constructor(

        public id: string = '',

        public username?: string, 
        
        public password?: string, 
        
        public fullname?: string, 
        
        public role?: string | Role, 
        
        public activated?: boolean,

        public image?: string,

        public createdBy?: string | User,

        public createdDate?: Date,

        public lastModifiedBy?: string | User,

        public lastModifiedDate?: Date) {
    }

}