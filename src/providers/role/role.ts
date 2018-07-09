import { Observable } from 'rxjs/Observable';
import { Role } from '../../models/role.model';

export abstract class RoleProvider{

  abstract findAll(): Observable<Array<Role>>;

}
