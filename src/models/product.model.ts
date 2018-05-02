import { Audit } from './audit.model';
import { User } from './user.model';
import { Category } from './category.model'

export class Product implements Audit{

    constructor(
        
        public id?: string,

        public name?: string, 
        
        public description?: string, 
        
        public price?: number, 
        
        public imageFileName?: string, 
        
        public category?: Category,

        public enabled?: boolean,
    
        public createdBy?: User,

        public createdDate?: Date,

        public lastModifiedBy?: User,

        public lastModifiedDate?: Date){
    }
    
}