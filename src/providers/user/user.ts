import { Observable } from 'rxjs/Observable';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';
import { User } from '../../models/user.model';

export abstract class UserProvider {

  abstract findById(id: string): Observable<User>;

  abstract findByUsername(username: string): Observable<User>;

  abstract findAll(): Observable<User[]>;

  abstract find(pageable: Pageable): Observable<Page<User>>;

  abstract save(user: User): Observable<User>;

  abstract update(user: User): Observable<User>;

  abstract delete(id: string): Observable<User>;


}
