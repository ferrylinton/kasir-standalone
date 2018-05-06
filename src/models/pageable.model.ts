import { Sort } from "./sort.model";
import { PAGE_SIZE } from "../constant/constant";

export class Pageable {

    constructor(

        public pageNumber: number,

        public totalData?: number,

        public sort?: Sort

    ) {
    }

    getTotalPage(): number{
        let remainder = this.totalData % PAGE_SIZE;
        let totalPage = (this.totalData - remainder) / PAGE_SIZE;
        return remainder === 0 ? totalPage : totalPage + 1;
    }

    isFirst(): boolean {
        return this.pageNumber === 1;
    }

    isLast(): boolean{
        return this.pageNumber === this.getTotalPage();
    }

    getStartRow(): number{
        return (this.pageNumber - 1) * PAGE_SIZE + 1;
    }
}