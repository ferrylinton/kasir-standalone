import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { UtilProvider } from '../util/util';
import { MockProvider } from '../mock/mock';
import { DataProvider } from '../data/data';
import { CategoryProvider } from '../../providers/category/category';
import { ProductProvider } from '../product/product';
import { Category } from '../../models/category.model';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';


@Injectable()
export class CategoryMockProvider extends MockProvider<Category> implements CategoryProvider {

  constructor(
    public utilProvider: UtilProvider,
    public dataProvider: DataProvider,
    public productProvider: ProductProvider
  ) {
    super();
    this.init();
  }

  private init(): void {
    this.setDatas(this.dataProvider.categories);
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
    for (let i = 0; i < this.datas.length; i++) {
      this.productProvider.countByCategory(this.datas[i].name).subscribe(total => {
        this.datas[i].products = total;
      });
    }

    return of(this.datas.map(function (category, index, array) {
      return category;

    }));
  }


}
