import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';
import { PAGE_SIZE } from '../../constant/constant';
import { Base } from '../../models/base.model';

export class MockProvider<T extends Base> {

    protected datas: T[];

    setDatas(datas: T[]): void{
        this.datas = datas;
    }

    findById(id: string): Observable<T> {
        let data: T = null;
        for (let i: number = 0; i < this.datas.length; i++) {
            if (this.datas[i].id === id) {
                data = this.datas[i];
            }
        }

        return of(data);
    }

    findAll(): Observable<T[]> {
        return of(this.datas);
    }

    save(data: T): Observable<T> {
        this.datas.push(data);
        return of(data);
    }

    update(data: T): Observable<T> {
        let index: number;
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

    find(pageable: Pageable): Observable<Page<Base>> {
        let start: number = (pageable.pageNumber - 1) * PAGE_SIZE + 1;
        let end: number = start + PAGE_SIZE - 1;

        if (pageable.pageNumber === 1 && this.datas.length < PAGE_SIZE) {
            end = this.datas.length;
        } else if (pageable.pageNumber > 1) {
            end = pageable.isLast() ? this.datas.length : start + PAGE_SIZE - 1;
        }

        return of(new Page(this.getDatas(start, end), pageable.pageNumber, this.datas.length, pageable.sort));
    }

    private getDatas(start: number, end: number): T[] {
        let datas = new Array<T>();

        for (let i: number = start; i <= end; i++) {
            datas.push(this.datas[i - 1]);
        }

        return datas;
    }
}
