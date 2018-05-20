import { Audit } from './audit.model';


export class User implements Audit{

    constructor(

        public id?: string,

        public username?: string, 
        
        public password?: string, 
        
        public fullname?: string, 
        
        public role?: string, 

        public authorities?: string[],
        
        public activated?: boolean,

        public createdBy?: string,

        public createdDate?: Date,

        public lastModifiedBy?: string,

        public lastModifiedDate?: Date) {
    }

}