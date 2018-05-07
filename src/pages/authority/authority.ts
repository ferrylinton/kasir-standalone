import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthorityProvider } from '../../providers/authority/authority';
import { Authority } from '../../models/authority.model';
import { Pageable } from '../../models/pageable.model';
import { Page } from '../../models/page.model';


@IonicPage()
@Component({
  selector: 'page-authority',
  templateUrl: 'authority.html',
})
export class AuthorityPage {

  private pageable: Pageable;

  private page: Page<Authority>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authorityProvider: AuthorityProvider) {

      this.init();
  }

  ionViewDidLoad() {
  }

  private init(): void{
    this.pageable = new Pageable(1);
    this.loadData(this.pageable);
  }

  private loadData(pageable: Pageable){
    this.authorityProvider.find(pageable).subscribe(page => {
      this.page = page;
    })
  }

  previous(): void{
    if(this.pageable.pageNumber > 1){
      this.pageable = new Pageable(this.page.pageNumber - 1, this.page.totalData);
      this.loadData(this.pageable);
    }
  }

  next(): void{
    if(this.pageable.pageNumber < this.page.getTotalPage()){
      this.pageable = new Pageable(this.page.pageNumber + 1, this.page.totalData);
      this.loadData(this.pageable);
    }
  }
}
