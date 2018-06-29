import { Observable } from 'rxjs/Observable';
import { Base } from '../../models/base.model';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';


export abstract class CrudProvider<T extends Base> {

  abstract findById(id: string): Observable<T>;

  abstract find(pageable: Pageable): Observable<Page<T>>;

  abstract save(data: T): Observable<T>;

  abstract update(data: T): Observable<T>;

  abstract delete(id: string): Observable<T>;

}
