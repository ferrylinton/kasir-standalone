import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { BaseProvider } from './base';
import { DataProvider } from './data';
import { UtilProvider } from '../util/util';
import { CategoryProvider } from '../../providers/category/category';
import { ProductProvider } from '../product/product';
import { Category } from '../../models/category.model';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';


@Injectable()
export class CategoryProviderImpl extends BaseProvider<Category> implements CategoryProvider {

  constructor(
    public utilProvider: UtilProvider,
    public dataProvider: DataProvider,
    public productProvider: ProductProvider
  ) {
    super(dataProvider.categories);
  }

  findByName(name: string, pageable: Pageable): Observable<Page<Category>> {
    let datas: Array<Category> = this.datas;

    if (name && name.trim() != '') {
      datas = this.utilProvider.filterObject(datas, 'name', name);
    }

    if (pageable.sort != null) {
      datas = this.utilProvider.sortObject(datas, pageable.sort);
    }

    return of(this.getPage(datas, pageable));
  }

  findAll(): Observable<Array<Category>> {
    return of(this.datas);
  }

}
