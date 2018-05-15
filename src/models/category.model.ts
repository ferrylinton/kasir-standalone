import { Audit } from './audit.model';

export class Category implements Audit{
    
    constructor(
        
        public id?: string,

        public name?: string, 
        
        public description?: string, 
        
        public imageFileName?: string,

        public createdBy?: string,

        public createdDate?: Date,

        public lastModifiedBy?: string,

        public lastModifiedDate?: Date){
    }
    
}