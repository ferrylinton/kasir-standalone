import { Base } from './base.model';

export class Version implements Base{

    constructor(
        
        public id?: string, 
        
        public createdDate?: Date){
    }
    
}