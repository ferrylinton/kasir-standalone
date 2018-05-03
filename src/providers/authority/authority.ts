import { Observable } from 'rxjs/Observable';
import { Authority } from '../../models/authority.model';

export abstract class AuthorityProvider {

  abstract findAll(): Observable<Authority[]>;
  
}
