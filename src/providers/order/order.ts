import { Observable } from 'rxjs/Observable';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';
import { Order } from '../../models/order.model';
import { CrudProvider } from '../crud/crud';


export abstract class OrderProvider extends CrudProvider<Order> {

  abstract findByDate(date: Date, pageable: Pageable): Observable<Page<Order>>;

}
