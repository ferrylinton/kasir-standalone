import { Audit } from './audit.model';


export class Product implements Audit{

    constructor(
        
        public id?: string,

        public name?: string, 
        
        public description?: string, 
        
        public price?: number, 
        
        public image?: string, 
        
        public category?: string,
    
        public createdBy?: string,

        public createdDate?: Date,

        public lastModifiedBy?: string,

        public lastModifiedDate?: Date){
    }
    
}