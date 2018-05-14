import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MenuProvider } from '../../providers/menu/menu';

import { Pageable } from '../../models/pageable.model';
import { Menu } from '../../models/menu.model';
import { Page } from '../../models/page.model';


@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  pageable: Pageable;

  page: Page<Menu>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuProvider: MenuProvider) {

    this.init();
  }

  ionViewWillEnter() {
    this.init();
  }

  private init(): void {
    this.pageable = new Pageable(1);
    this.loadData(this.pageable);
  }

  private loadData(pageable: Pageable) {
    this.menuProvider.find(pageable).subscribe(page => {
      this.page = page;
    })
  }

  previous(): void {
    if (this.pageable.pageNumber > 1) {
      this.pageable = new Pageable(this.page.pageNumber - 1, this.page.totalData);
      this.loadData(this.pageable);
    }
  }

  next(): void {
    if (this.pageable.pageNumber < this.page.getTotalPage()) {
      this.pageable = new Pageable(this.page.pageNumber + 1, this.page.totalData);
      this.loadData(this.pageable);
    }
  }

  view(menu: Menu) {
    this.navCtrl.push('MenuDetailPage', {
      menu: menu
    });
  }

  add() {
    let menu = new Menu();
   
    this.navCtrl.push('MenuAddPage', {
      menu: menu
    });
  }

}
