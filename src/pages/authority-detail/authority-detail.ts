import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Authority } from '../../models/authority.model';


@IonicPage()
@Component({
  selector: 'page-authority-detail',
  templateUrl: 'authority-detail.html',
})
export class AuthorityDetailPage {

  private authority: Authority;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.authority = navParams.get('authority');
  }

}
