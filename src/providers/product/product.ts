import { Observable } from 'rxjs/Observable';
import { Product } from "../../models/product.model";
import { Pageable } from '../../models/pageable.model';

export abstract class ProductProvider {

  abstract findById(id: string): Observable<Product>;

  abstract findAll(pageable: Pageable): Observable<Product[]>;

  abstract findByCategoryId(id: string): Observable<Product[]>;

  abstract save(category: Product): Observable<any>;

  abstract update(category: Product): Observable<any>;

  abstract delete(id: String): Observable<any>;

}
