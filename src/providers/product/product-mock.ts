import { Injectable } from '@angular/core';
import { ProductProvider } from './product';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../models/product.model';
import { Pageable } from '../../models/pageable.model';

@Injectable()
export class ProductMockProvider extends ProductProvider{

  constructor(){
    super();
  }

  findById(id: string): Observable<Product> {
    throw new Error("Method not implemented.");
  }

  findAll(pageable: Pageable): Observable<Product[]> {
    throw new Error("Method not implemented.");
  }

  findByCategoryId(id: string): Observable<Product[]> {
    throw new Error("Method not implemented.");
  }

  save(category: Product): Observable<any> {
    throw new Error("Method not implemented.");
  }

  update(category: Product): Observable<any> {
    throw new Error("Method not implemented.");
  }

  delete(id: String): Observable<any> {
    throw new Error("Method not implemented.");
  }

}
