import { Injectable } from '@angular/core';
import { CategoryProvider } from '../../providers/category/category';
import { Observable } from 'rxjs/Observable';
import { Category } from '../../models/category.model';

@Injectable()
export class CategoryMockProvider extends CategoryProvider{

  constructor() {
    super();
  }

  findById(id: string): Observable<Category> {
    throw new Error("Method not implemented.");
  }
  
  findAll(): Observable<Category[]> {
    throw new Error("Method not implemented.");
  }

  save(category: Category): Observable<any> {
    throw new Error("Method not implemented.");
  }

  update(category: Category): Observable<any> {
    throw new Error("Method not implemented.");
  }

  delete(id: String): Observable<any> {
    throw new Error("Method not implemented.");
  }
  
}
