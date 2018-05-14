import { Observable } from 'rxjs/Observable';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';
import { Menu } from '../../models/menu.model';

export abstract class MenuProvider {

  abstract findById(id: string): Observable<Menu>;

  abstract findAll(): Observable<Menu[]>;

  abstract find(pageable: Pageable): Observable<Page<Menu>>;

  abstract save(menu: Menu): Observable<Menu>;

  abstract update(menu: Menu): Observable<Menu>;

  abstract delete(id: string): Observable<Menu>;
  
}
