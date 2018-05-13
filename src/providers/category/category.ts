import { Observable } from 'rxjs/Observable';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';
import { Category } from "../../models/category.model";

export abstract class CategoryProvider {

  abstract findById(id: string): Observable<Category>;

  abstract findAll(): Observable<Category[]>;

  abstract find(pageable: Pageable): Observable<Page<Category>>;

  abstract save(category: Category): Observable<Category>;

  abstract update(category: Category): Observable<Category>;

  abstract delete(id: string): Observable<Category>;

}
