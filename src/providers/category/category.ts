import { Observable } from 'rxjs/Observable';
import { Category } from "../../models/category.model";
import { CrudProvider } from '../crud/crud';

export abstract class CategoryProvider extends CrudProvider<Category> {

  abstract findAll(): Observable<Array<Category>>;

}
