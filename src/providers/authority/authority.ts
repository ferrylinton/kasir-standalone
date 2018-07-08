import { Observable } from 'rxjs/Observable';
import { Authority } from '../../models/authority.model';
import { CrudProvider } from '../crud/crud';

export abstract class AuthorityProvider extends CrudProvider<Authority> {

  abstract findAll(): Observable<Array<Authority>>;

  abstract findByRole(role: string): Observable<Array<string>>;
  
}
