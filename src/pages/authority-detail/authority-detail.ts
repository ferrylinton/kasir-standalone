import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { BasePage } from '../base/base';
import { Authority } from '../../models/authority.model';


@IonicPage()
@Component({
  selector: 'page-authority-detail',
  templateUrl: 'authority-detail.html',
})
export class AuthorityDetailPage extends BasePage {

  private authority: Authority;

  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public translate: TranslateService,
    public storage: Storage,
    public events: Events,
    public navCtrl: NavController,
    public navParams: NavParams) {

    super(toastCtrl, alertCtrl, translate, storage, events);
    this.init(navParams);
  }

  private init(navParams: NavParams): void {
    this.authority = navParams.get('authority');
    if (this.authority === undefined) {
      this.reloadPage('AuthorityPage');
    }
  }
  
}
