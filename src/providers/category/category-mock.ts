import { Injectable } from '@angular/core';
import { MockProvider } from '../mock/mock';
import { DataProvider } from '../data/data';
import { CategoryProvider } from '../../providers/category/category';
import { Category } from '../../models/category.model';

@Injectable()
export class CategoryMockProvider extends MockProvider<Category> implements CategoryProvider{

  constructor(public dataProvider: DataProvider) {
    super();
    this.init();
  }

  private init(): void {
    this.setDatas(this.dataProvider.categories);
  }
  
}
