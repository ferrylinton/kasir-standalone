import { Observable } from 'rxjs/Observable';
import { Authority } from '../../models/authority.model';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';
import { CrudProvider } from '../crud/crud';

export abstract class AuthorityProvider extends CrudProvider<Authority> {

  abstract findAll(): Observable<Array<Authority>>;
  
}
