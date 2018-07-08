import { Observable } from 'rxjs/Observable';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';
import { Product } from "../../models/product.model";
import { CrudProvider } from '../crud/crud';

export abstract class ProductProvider extends CrudProvider<Product> {

  abstract findByName(name: string, pageable: Pageable): Observable<Page<Product>>;

  abstract findByCategory(category:string, pageable: Pageable): Observable<Page<Product>>;

}
