import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { v4 as uuid } from 'uuid';

import * as Constant from "../../constant/constant";
import { MessageProvider } from '../../providers/message/message';
import { CurrencyProvider } from '../../providers/currency/currency'
import { Currency } from '../../models/currency.model';


@IonicPage()
@Component({
  selector: 'page-currency-form',
  templateUrl: 'currency-form.html',
})
export class CurrencyFormPage {

  isCreate: boolean;

  isReadyToSave: boolean;

  form: FormGroup;

  currency: Currency;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public events: Events,
    public translateService: TranslateService,
    public currencyProvider: CurrencyProvider,
    public messageProvider: MessageProvider,
    public formBuilder: FormBuilder) {
  }

  ionViewWillEnter() {
    this.init();
  }

  private init(): void {
    this.currency = this.navParams.get('currency');

    if (!this.currency) {
      this.events.publish(Constant.PAGE, { page: 'CurrencyPage', params: {} });
    } else {
      this.initVariable();
      this.initForm();
    }
  }

  private initVariable(): void {
    this.isCreate = this.currency.id === '';
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: [this.currency.name, Validators.required],
      description: [this.currency.description, Validators.required]
    });

    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  save() {
    if (!this.form.valid) {
      return;
    } else {
      this.messageProvider.confirmSave(() => this.saveCallback(this.form.value));
    }
  }

  private saveCallback(currency: Currency): void {
    if (this.isCreate) {
      this.create(currency);
    } else {
      this.modify(currency);
    }
  }

  private create(currency: Currency): void {
    currency.id = uuid();
    this.currencyProvider.save(currency).subscribe((result) => {
      this.showMessage();
    }, (error) => {
      this.messageProvider.toast('Error : ' + error);
    });
  }

  private modify(currency: Currency): void {
    currency.id = this.currency.id;
    this.currencyProvider.update(currency).subscribe(result => {
      this.showMessage();
    }, (error) => {
      this.messageProvider.toast('Error : ' + error);
    });
  }

  private showMessage(): void {
    this.navCtrl.popToRoot();
    this.messageProvider.toastSave();
  }

}

