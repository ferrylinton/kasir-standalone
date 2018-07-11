import { Audit } from './audit.model';
import { Category } from './category.model';
import { User } from './user.model';


export class Product implements Audit{

    constructor(
        
        public id?: string,

        public name?: string, 
        
        public description?: string, 
        
        public price?: number, 
        
        public image?: string, 
        
        public category?: Category,
    
        public createdBy?: string | User,

        public createdDate?: Date,

        public lastModifiedBy?: string | User,

        public lastModifiedDate?: Date){
    }
    
}