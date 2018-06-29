import { CrudProvider } from '../crud/crud';
import { Observable } from 'rxjs/Observable';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';
import { User } from '../../models/user.model';


export abstract class UserProvider extends CrudProvider<User> {

  abstract findByUsername(username: string): Observable<User>;

  abstract findAll(): Observable<User[]>;

  abstract find(pageable: Pageable): Observable<Page<User>>;

}
