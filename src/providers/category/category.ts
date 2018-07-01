import { Observable } from 'rxjs/Observable';
import { CrudProvider } from '../crud/crud';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';
import { Category } from "../../models/category.model";

export abstract class CategoryProvider extends CrudProvider<Category> {

  abstract findAll(): Observable<Array<Category>>;

  abstract findByName(name: string, pageable: Pageable): Observable<Page<Category>>

}
