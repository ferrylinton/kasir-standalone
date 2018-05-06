import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of'; 
import { AuthorityProvider } from './authority';
import { Authority } from '../../models/authority.model';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';
import { PAGE_SIZE } from '../../constant/constant';


@Injectable()
export class AuthorityMockProvider extends AuthorityProvider {

  private authorities: Authority[];

  constructor(){
    super();
    this.init();
  }

  private init(){
    if(this.authorities === undefined){
      this.authorities = new Array<Authority>();

      this.authorities.push(new Authority('authority-0000-0000-0000-001', 'AUTHORITY_VIEW', 'View Authority Data'));
      this.authorities.push(new Authority('authority-0000-0000-0000-002', 'ROLE_VIEW', 'View Role Data'));
      this.authorities.push(new Authority('authority-0000-0000-0000-003', 'ROLE_CHANGE', 'Change Role Data'));
      this.authorities.push(new Authority('authority-0000-0000-0000-004', 'USER_VIEW', 'View User Data'));
      this.authorities.push(new Authority('authority-0000-0000-0000-005', 'USER_CHANGE', 'Change User Data'));
      this.authorities.push(new Authority('authority-0000-0000-0000-006', 'MENU_VIEW', 'View Menu Data'));
      this.authorities.push(new Authority('authority-0000-0000-0000-007', 'MENU_CHANGE', 'Change Menu Data'));
      this.authorities.push(new Authority('authority-0000-0000-0000-008', 'CATEGORY_VIEW', 'View Category Data'));
      this.authorities.push(new Authority('authority-0000-0000-0000-009', 'CATEGORY_CHANGE', 'Change Category Data'));
      this.authorities.push(new Authority('authority-0000-0000-0000-010', 'PRODUCT_VIEW', 'View Product Data'));
      this.authorities.push(new Authority('authority-0000-0000-0000-011', 'PRODUCT_CHANGE', 'Change Product Data'));
      this.authorities.push(new Authority('authority-0000-0000-0000-012', 'ORDER_VIEW', 'View Order Data'));
      this.authorities.push(new Authority('authority-0000-0000-0000-013', 'ORDER_CHANGE', 'Change Order Data'));
      this.authorities.push(new Authority('authority-0000-0000-0000-014', 'SETTING_VIEW', 'View Setting Data'));
      this.authorities.push(new Authority('authority-0000-0000-0000-015', 'SETTING_CHANGE', 'Change Setting Data'));
      this.authorities.push(new Authority('authority-0000-0000-0000-016', 'DB_VIEW', 'View DB Data'));
      this.authorities.push(new Authority('authority-0000-0000-0000-017', 'DB_CHANGE', 'Change DB Data'));
    }
  }

  findAll(): Observable<Authority[]> {
    return of(this.authorities);
  }

  find(pageable: Pageable): Observable<Page<Authority>>{
    let start:number = (pageable.pageNumber - 1) * PAGE_SIZE + 1;
    let end:number = start + PAGE_SIZE - 1;

    if(pageable.pageNumber > 1){
      end = pageable.isLast ? this.authorities.length : start + PAGE_SIZE - 1;
    }

    return of(new Page(this.getAuthorities(start, end), pageable.pageNumber, this.authorities.length, pageable.sort));
  }

  private getAuthorities(start: number, end: number): Authority[]{
    let authorities = new Array<Authority>();

    for(let i:number = start; i<=end; i++){
      authorities.push(this.authorities[i-1]);
    }

    return authorities;
  }

}
