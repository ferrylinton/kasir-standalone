import { Observable } from 'rxjs/Observable';
import { Role } from '../../models/role.model';

export abstract class RoleProvider {

  abstract findById(id: string): Observable<Role>;

  abstract findAll(): Observable<Role[]>;

  abstract save(role: Role): void;

  abstract update(role: Role): void;

  abstract delete(id: string): void;

}
