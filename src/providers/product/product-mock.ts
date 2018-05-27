import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { UtilProvider } from '../util/util';
import { MockProvider } from '../mock/mock';
import { DataProvider } from '../data/data';
import { ProductProvider } from './product';

import { PAGE_SIZE } from '../../constant/constant';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';
import { Product } from '../../models/product.model';
import { Sort } from '../../models/sort.model';


@Injectable()
export class ProductMockProvider extends MockProvider<Product> implements ProductProvider {

  constructor(
    public dataProvider: DataProvider,
    public util: UtilProvider) {
    super();
    this.init();
  }

  private init(): void {
    this.setDatas(this.dataProvider.products);
  }

  find(pageable: Pageable): Observable<Page<Product>> {
    let products: Array<Product> = this.datas;

    if (pageable.sort != null) {
      products = this.util.sortObject(this.datas, pageable.sort);
    }

    let start: number = (pageable.pageNumber - 1) * PAGE_SIZE + 1;
    let end: number = start + PAGE_SIZE - 1;

    if (pageable.pageNumber === 1 && products.length < PAGE_SIZE) {
      end = products.length;
    } else if (pageable.pageNumber > 1) {
      end = pageable.isLast() ? products.length : start + PAGE_SIZE - 1;
    }

    return of(new Page(products.slice(start, end + 1), pageable.pageNumber, products.length, pageable.sort));
  }

  findByName(name: string, pageable: Pageable): Observable<Page<Product>> {
    throw new Error("Method not implemented.");
  }

  findByCategory(category: string, pageable: Pageable): Observable<Page<Product>> {
    throw new Error("Method not implemented.");
  }

  findByCategoryAndName(category: string, name: string, pageable: Pageable): Observable<Page<Product>> {
    throw new Error("Method not implemented.");
  }

}
