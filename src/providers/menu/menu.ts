import { Observable } from 'rxjs/Observable';
import { Menu } from '../../models/menu.model';

export abstract class MenuProvider {

  abstract findById(id: string): Observable<Menu>;

  abstract findAll(): Observable<Menu[]>;
  
}
