import { Observable } from 'rxjs/Observable';
import { Authority } from '../../models/authority.model';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';

export abstract class AuthorityProvider {

  abstract findAll(): Observable<Authority[]>;
  
  abstract find(pageable: Pageable): Observable<Page<Authority>>;
  
}
