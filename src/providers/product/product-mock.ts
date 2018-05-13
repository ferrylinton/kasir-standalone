import { Injectable } from '@angular/core';
import { MockProvider } from '../mock/mock';
import { ProductProvider } from './product';
import { Observable } from 'rxjs/Observable';
import { Category } from '../../models/category.model';
import { User } from '../../models/user.model';
import { Product } from '../../models/product.model';

@Injectable()
export class ProductMockProvider extends MockProvider<Product> implements ProductProvider{

  constructor(){
    super();
    this.init();
  }

  private init(): void {
    let products: Product[] = new Array<Product>();
    let user: User = new User('user-0000-0000-0000-001', 'admin', 'password', 'Admin Admin');

    for(let i:number = 1; i<6; i++){
      let category: Category = new Category('category-0000-0000-0000-' + this.zeroPad(i, 3), 'Category ' + this.zeroPad(i, 3), 'Category Description ' + this.zeroPad(i, 3), 'imgs/image-medium.png', user, new Date());
    
      let start: number = i * 100;
      let end: number = start + 10;
      for(let j:number = start; j <= end; j++){
        products.push(new Product('category-0000-0000-0000-' + j, 'Product ' + j, 'Description ' + j, j, 'imgs/image-medium.png', category, user, new Date()));
      }
    }
    
    this.setDatas(products);
  }

  findByCategoryId(id: string): Observable<Product[]> {
    throw new Error("Method not implemented.");
  }

}
