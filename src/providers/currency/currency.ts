import { Observable } from 'rxjs/Observable';
import { CrudProvider } from '../crud/crud';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';
import { Currency } from '../../models/currency.model';

export abstract class CurrencyProvider extends CrudProvider<Currency> {

  abstract findAll(): Observable<Array<Currency>>;

  abstract findByName(name: string, pageable: Pageable): Observable<Page<Currency>>

}

