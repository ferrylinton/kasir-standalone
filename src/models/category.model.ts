import { Audit } from './audit.model';
import { User } from './user.model';

export class Category implements Audit{
    
    constructor(
        
        public id?: string,

        public name?: string, 
        
        public description?: string, 
        
        public imageFileName?: String,

        public createdBy?: User,

        public createdDate?: Date,

        public lastModifiedBy?: User,

        public lastModifiedDate?: Date){
    }
    
}