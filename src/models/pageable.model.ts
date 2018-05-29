import { Sort } from "./sort.model";
import { PAGE_SIZE } from "../constant/constant";

export class Pageable {

    constructor(

        public pageNumber: number,

        public totalData: number = 0,

        public sort: Sort = new Sort(),

        public size: number = PAGE_SIZE

    ) {
    }

    getTotalPage(): number{
        let remainder = this.totalData % this.size;
        let totalPage = (this.totalData - remainder) / this.size;
        return remainder === 0 ? totalPage : totalPage + 1;
    }

    isFirst(): boolean {
        return this.pageNumber === 1;
    }

    isLast(): boolean{
        return this.pageNumber === this.getTotalPage();
    }

    getStartRow(): number{
        return (this.pageNumber - 1) * this.size + 1;
    }

}