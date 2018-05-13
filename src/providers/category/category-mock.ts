import { Injectable } from '@angular/core';
import { MockProvider } from '../mock/mock';
import { CategoryProvider } from '../../providers/category/category';
import { Category } from '../../models/category.model';
import { User } from '../../models/user.model';

@Injectable()
export class CategoryMockProvider extends MockProvider<Category> implements CategoryProvider{

  constructor() {
    super();
    this.init();
  }

  private init(): void {
    let categories: Category[] = new Array<Category>();
    let user: User = new User('user-0000-0000-0000-001', 'admin', 'password', 'Admin Admin');

    for(let i:number = 1; i<30; i++){
      categories.push(new Category('category-0000-0000-0000-' + this.zeroPad(i, 3), 'Category ' + this.zeroPad(i, 3), 'Category Description ' + this.zeroPad(i, 3), 'imgs/image-medium.png', user, new Date()));
    }
    
    this.setDatas(categories);
  }
  
}
