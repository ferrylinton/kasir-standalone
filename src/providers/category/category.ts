import { Observable } from 'rxjs/Observable';
import { Category } from "../../models/category.model";

export abstract class CategoryProvider {

  abstract findById(id: string): Observable<Category>;

  abstract findAll(): Observable<Category[]>;

  abstract save(category: Category): Observable<any>;

  abstract update(category: Category): Observable<any>;

  abstract delete(id: String): Observable<any>;

}
