import { Observable } from 'rxjs/Observable';
import { Role } from '../../models/role.model';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';

export abstract class RoleProvider {

  abstract findById(id: string): Observable<Role>;

  abstract findAll(): Observable<Role[]>;

  abstract find(pageable: Pageable): Observable<Page<Role>>;

  abstract save(role: Role): Observable<Role>;

  abstract update(role: Role): Observable<Role>;

  abstract delete(id: string): Observable<Role>;

}
