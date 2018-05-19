import { Base } from './base.model';


export class Menu implements Base {

    constructor(

        public id?: string,

        public title?: string,

        public parent?: Menu,

        public menus?: Menu[],

        public page?: string,

        public icon?: string,

        public authority?: string

        ) {
    }

}