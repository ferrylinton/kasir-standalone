import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Base } from '../../models/base.model';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';


export class BaseProvider<T extends Base> {

    protected datas: Array<T>;

    constructor(datas: Array<T>){
        this.datas = datas;
    }
    
    save(data: T): Observable<T> {
        this.datas.push(data);
        return of(data);
    }

    update(data: T): Observable<T> {
        for (let i: number = 0; i < this.datas.length; i++) {
            if (this.datas[i].id === data.id) {
                this.datas[i] = data;
            }
        }

        return of(data);
    }

    delete(id: string): Observable<T> {
        let data: T;
        let index: number;
        for (let i: number = 0; i < this.datas.length; i++) {
            if (this.datas[i].id === id) {
                data = this.datas[i];
                index = i;
            }
        }

        this.datas.splice(index, 1);
        return of(data);
    }

    getDatas(start: number, end: number): T[] {
        let datas = new Array<T>();

        for (let i: number = start; i <= end; i++) {
            datas.push(this.datas[i - 1]);
        }

        return datas;
    }

    getPage(datas: Array<T>, pageable: Pageable): Page<T> {
        return new Page(this.getSliceDatas(datas, pageable), pageable.pageNumber, datas.length, pageable.sort)
    }

    private getSliceDatas(datas: Array<T>, pageable: Pageable): Array<T> {
        let start: number = (pageable.pageNumber - 1) * pageable.size;
        return pageable.isLast() ? datas.slice(start, datas.length) : datas.slice(start, start + pageable.size);
    }
}
