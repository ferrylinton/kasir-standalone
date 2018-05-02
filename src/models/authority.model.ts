import { Base } from './base.model';

export class Authority implements Base {

    constructor(

        public id?: string,

        public name?: string,
        
        public description?: string) {
    }

}