import { Audit } from './audit.model';
import { User } from './user.model';

export class Currency implements Audit{
    
    constructor(
        
        public id: string = '',

        public name?: string,

        public description?: string, 

        public createdBy?: string | User,

        public createdDate?: Date,

        public lastModifiedBy?: string | User,

        public lastModifiedDate?: Date){
    }
    
}