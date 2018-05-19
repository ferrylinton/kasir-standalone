import { Injectable } from '@angular/core';
import { MockProvider } from '../mock/mock';
import { DataProvider } from '../data/data';
import { ProductProvider } from './product';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../models/product.model';


@Injectable()
export class ProductMockProvider extends MockProvider<Product> implements ProductProvider {

  constructor(public dataProvider: DataProvider) {
    super();
    this.init();
  }

  private init(): void {
    this.setDatas(this.dataProvider.products);
  }

  findByCategoryId(id: string): Observable<Product[]> {
    throw new Error("Method not implemented.");
  }

}
