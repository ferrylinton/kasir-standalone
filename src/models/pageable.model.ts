import { Sort } from "./sort.model";

export class Pageable {

    constructor(

        public page: number,

        public size: number,

        public sort?: Sort

    ) {
    }

}