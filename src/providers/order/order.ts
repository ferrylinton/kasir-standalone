import { Observable } from 'rxjs/Observable';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';
import { Order } from '../../models/order.model';


export abstract class OrderProvider {

  abstract findById(id: string): Observable<Order>;

  abstract find(pageable: Pageable): Observable<Page<Order>>;

  abstract findByDate(date: Date, pageable: Pageable): Observable<Page<Order>>;

  abstract findBetweenDate(startDate: Date, endDate: Date, pageable: Pageable): Observable<Page<Order>>;

  abstract save(order: Order): Observable<Order>;

  abstract update(order: Order): Observable<Order>;

  abstract delete(id: string): Observable<Order>;

}
