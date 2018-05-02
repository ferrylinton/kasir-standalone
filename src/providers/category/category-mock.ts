import { Injectable } from '@angular/core';
import { CategoryProvider } from '../../providers/category/category';

@Injectable()
export class CategoryMockProvider extends CategoryProvider{

  constructor() {
    super();
    console.log('Hello CategoryMockProvider Provider');
  }

    findById(): void{
    console.log('.................................CategoryMockProvider');
  }
}
