import { Injectable } from '@angular/core';
import { ToastController, AlertController } from "ionic-angular";
import { TranslateService } from "@ngx-translate/core";
import { Base } from "../../models/base.model";

@Injectable()
export class MessageProvider {

  private cancelTxt = 'Cancel';

  private okTxt: string = 'Ok';

  private confirmTxt: string = 'Confirm';

  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public translate: TranslateService
  ) {
    this.initLanguage();
  }

  private initLanguage(): void {
    let keys: string[] = [
      'OK',
      'CANCEL',
      'CONFIRM'
  ];

    this.translate.get(keys).subscribe(values => {
      this.okTxt = values[keys[0]];
      this.cancelTxt = values[keys[1]];
      this.confirmTxt = values[keys[2]];
    });
  }

  showToast(message: string): void {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }

  showSaveToast(isCreate: boolean,data: string): void {
    let message = 'Save data[' + data + '] is successfully'
    this.translate.get(isCreate ? 'CREATE_SUCCESS': 'MODIFY_SUCCESS', { data: data }).subscribe((value: string) => {
      message = value;
    });

    this.showToast(message);
  }

  showAddToast(data: string): void {
    let message = 'Add new data[' + data + '] is successfully'
    this.translate.get('MESSAGE.ADD_SUCCESS', { data: data }).subscribe((value: string) => {
      message = value;
    });

    this.showToast(message);
  }

  showEditToast(data: string): void {
    let message = 'Edit data[' + data + '] is successfully'
    this.translate.get('MESSAGE.EDIT_SUCCESS', { data: data }).subscribe((value: string) => {
      message = value;
    });

    this.showToast(message);
  }

  showDeleteToast(data: string): void {
    let message = 'Delete data[' + data + '] is successfully'
    this.translate.get('DELETE_SUCCESS', { data: data }).subscribe((value: string) => {
      message = value;
    });

    this.showToast(message);
  }

  showSaveConfirm(isCreate: boolean, data: string, callback: (dt: Base) => void): void {
    let message = 'Do you want to save data[' + data + ']?'
    this.translate.get(isCreate ? 'CREATE_CONFIRM' : 'MODIFY_CONFIRM', { data: data }).subscribe((res: string) => {
      message = res;
    });

    this.showConfirm(message, callback);
  }

  showAddConfirm(data: string, callback: (dt: Base) => void): void {
    let message = 'Do you want to add new data[' + data + ']?'
    this.translate.get('MESSAGE.ADD_CONFIRM', { data: data }).subscribe((value: string) => {
      message = value;
    });

    this.showConfirm(message, callback);
  }

  showEditConfirm(data: string, callback: (dt: Base) => void): void {
    let message = 'Do you want to edit data[' + data + ']?'
    this.translate.get('MESSAGE.EDIT_CONFIRM', { data: data }).subscribe((res: string) => {
      message = res;
    });

    this.showConfirm(message, callback);
  }

  showDeleteConfirm(data: string, callback: (dt: Base) => void): void {
    let message = 'Do you want to delete data[' + data + ']?'
    this.translate.get('DELETE_CONFIRM', { data: data }).subscribe((res: string) => {
      message = res;
    });

    this.showConfirm(message, callback);
  }

  showConfirm(message: string, callback: (dt: Base) => void): void {
    const alert = this.alertCtrl.create({
      title: this.confirmTxt,
      message: message,
      buttons: [
        {
          text: this.cancelTxt,
          role: 'cancel'
        },
        {
          text: this.okTxt,
          handler: callback
        }
      ]
    });

    alert.present();
  }

}
