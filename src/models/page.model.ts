import { Sort } from "./sort.model";
import { Pageable } from "./pageable.model";

export class Page<T> extends Pageable {

    constructor(

        public data: Array<T> = new Array<T>(),

        public pageNumber: number = 1,

        public totalData: number = 0,

        public sort: Sort = new Sort('id', true)

    ) {
        super(pageNumber, totalData, sort);
    }

}