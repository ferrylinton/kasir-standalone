import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { BaseProvider } from './base';
import { DataProvider } from './data';
import { UtilProvider } from '../util/util';
import { ProductProvider } from '../product/product';

import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';
import { Product } from '../../models/product.model';


@Injectable()
export class ProductProviderImpl extends BaseProvider<Product> implements ProductProvider {

  constructor(
    public dataProvider: DataProvider,
    public utilProvider: UtilProvider) {
    super(dataProvider.products);
  }

  findByName(name: string, pageable: Pageable): Observable<Page<Product>> {
    let datas: Array<Product> = this.datas;

    if (name && name.trim() != '') {
      datas = this.utilProvider.filterObject(datas, 'name', name);
    }

    if (pageable.sort != null) {
      datas = this.utilProvider.sortObject(datas, pageable.sort);
    }

    return of(this.getPage(datas, pageable));
  }

  findByCategory(category: string, pageable: Pageable): Observable<Page<Product>> {
    let datas: Array<Product> = this.datas;

    if (category && category.trim() != '0') {
      datas = this.utilProvider.filterObject(datas, 'category', category);
    }

    if (pageable.sort != null) {
      datas = this.utilProvider.sortObject(datas, pageable.sort);
    }

    return of(this.getPage(datas, pageable));
  }

}
