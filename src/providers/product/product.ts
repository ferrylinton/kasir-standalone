import { Observable } from 'rxjs/Observable';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';
import { Product } from "../../models/product.model";

export abstract class ProductProvider {

  abstract findById(id: string): Observable<Product>;

  abstract findAll(): Observable<Product[]>;

  abstract find(pageable: Pageable): Observable<Page<Product>>;

  abstract save(product: Product): Observable<Product>;

  abstract update(productproduct: Product): Observable<Product>;

  abstract delete(id: string): Observable<Product>;

}
