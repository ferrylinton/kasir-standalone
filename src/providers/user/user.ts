import { CrudProvider } from '../crud/crud';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user.model';


export abstract class UserProvider extends CrudProvider<User> {

  abstract findByUsername(username: string): Observable<User>;

}
