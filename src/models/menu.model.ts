import { Base } from './base.model';
import { Authority } from './authority.model';

export class Menu implements Base {

    constructor(

        public id?: string,

        public title?: string,

        public page?: string,

        public icon?: string,

        public authority?: Authority,

        public menus?: Menu[]) {
    }

}