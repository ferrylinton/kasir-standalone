import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { UtilProvider } from '../util/util';
import { MockProvider } from '../mock/mock';
import { DataProvider } from '../data/data';
import { ProductProvider } from './product';

import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';
import { Product } from '../../models/product.model';


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
    let datas: Array<Product> = this.datas;

    if (pageable.sort != null) {
      datas = this.util.sortObject(datas, pageable.sort);
    }

    return of(this.getPage(datas, pageable));
  }

  findByName(name: string, pageable: Pageable): Observable<Page<Product>> {
    let datas: Array<Product> = this.datas;

    if (name && name.trim() != '') {
      datas = this.util.filterObject(datas, 'name', name);
    }

    if (pageable.sort != null) {
      datas = this.util.sortObject(datas, pageable.sort);
    }

    return of(this.getPage(datas, pageable));
  }

  findByCategory(category: string, pageable: Pageable): Observable<Page<Product>> {
    let datas: Array<Product> = this.datas;

    if (category && category.trim() != '0') {
      datas = this.util.filterObject(datas, 'category', category);
    }

    if (pageable.sort != null) {
      datas = this.util.sortObject(datas, pageable.sort);
    }

    return of(this.getPage(datas, pageable));
  }

  countByCategory(category: string): Observable<number> {
    let datas: Array<Product> = this.util.filterObject(this.datas, 'category', category);
    return of(datas.length);
  }

  findByCategoryAndName(category: string, name: string, pageable: Pageable): Observable<Page<Product>> {
    let datas: Array<Product> = this.datas;

    if (category && category.trim() != '') {
      datas = this.util.filterObject(datas, 'category', category);
    }
    
    if (name && name.trim() != '') {
      datas = this.util.filterObject(datas, 'name', name);
    }

    if (pageable.sort != null) {
      datas = this.util.sortObject(datas, pageable.sort);
    }

    return of(this.getPage(datas, pageable));
  }

}
