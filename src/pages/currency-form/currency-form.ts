import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { v4 as uuid } from 'uuid';

import { BasePage } from '../base/base';
import { SettingProvider } from '../../providers/setting/setting';
import { MessageProvider } from '../../providers/message/message';
import { CurrencyProvider } from '../../providers/currency/currency'

import { Currency } from '../../models/currency.model';


@IonicPage()
@Component({
  selector: 'page-currency-form',
  templateUrl: 'currency-form.html',
})
export class CurrencyFormPage extends BasePage {

  private RELOAD_PAGE: string = 'CurrencyPage';

  private DATA: string = 'currency';

  @ViewChild('fileInput') fileInput;

  isCreate: boolean;

  isReadyToSave: boolean;

  form: FormGroup;

  curr: Currency;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public events: Events,
    public translateService: TranslateService,
    public settingProvider: SettingProvider,
    public messageProvider: MessageProvider,
    public currencyProvider: CurrencyProvider,
    public camera: Camera,
    public formBuilder: FormBuilder) {

    super(storage, events, translateService, settingProvider, messageProvider);
    this.init();
  }

  private init(): void {
    this.curr = this.navParams.get(this.DATA);

    if (this.curr === undefined) {
      this.reloadPage(this.RELOAD_PAGE);
    } else {
      this.initVariable();
      this.initForm();
    }
  }

  private initVariable(): void{
    this.isCreate = this.curr.id === '';
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: [this.curr.name, Validators.required],
      description: [this.curr.description, Validators.required]
    });

    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  save() {
    if (!this.form.valid) {
      return;
    } else {
      this.messageProvider.showSaveConfirm(this.isCreate, this.form.value.name, (currency) => this.saveCallback(this.form.value));
    }
  }

  private saveCallback(currency: Currency): void {
    if (this.isCreate) {
      this.create(currency);
    } else {
      this.modify(currency);
    }
  }

  private create(curr: Currency): void {
    curr.id = uuid();
    curr.createdBy = this.loggedUser.username;
    curr.createdDate = new Date();
    this.currencyProvider.save(curr).subscribe(result => {
      this.showSaveResult(result);
    });
  }

  private modify(curr: Currency): void {
    curr.id = this.curr.id;
    curr.createdBy = this.curr.createdBy;
    curr.createdDate = this.curr.createdDate;
    curr.lastModifiedBy = this.loggedUser.username;
    curr.lastModifiedDate = new Date();
    this.currencyProvider.update(curr).subscribe(result => {
      this.showSaveResult(result);
    });
  }

  private showSaveResult(currency: Currency): void{
    this.navCtrl.popToRoot();
    this.messageProvider.showSaveToast(this.isCreate, currency.name);
  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({ 'image': 'data:image/png;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    if (event.target.files.length != 0) {
      let reader = new FileReader();
      reader.onload = (readerEvent) => {
        let imageData = (readerEvent.target as any).result;
        this.form.patchValue({ 'image': imageData });
      };

      reader.readAsDataURL(event.target.files[0]);
    } else {
      console.log('cancel...................');
    }

  }

  getImageStyle() {
    return 'url(' + this.form.controls['image'].value + ')'
  }

}

