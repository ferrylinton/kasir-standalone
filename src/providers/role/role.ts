import { Observable } from 'rxjs/Observable';
import { CrudProvider } from '../crud/crud';
import { Role } from '../../models/role.model';


export abstract class RoleProvider extends CrudProvider<Role>{

  abstract findAll(): Observable<Array<Role>>;

}
