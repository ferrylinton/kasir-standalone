import { Sort } from "./sort.model";
import { Pageable } from "./pageable.model";

export class Page<T> extends Pageable {

    constructor(

        public data: T[],

        public pageNumber: number,

        public totalData?: number,

        public sort?: Sort

    ) {
        super(pageNumber, totalData, sort);
    }

}