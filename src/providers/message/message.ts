import { Injectable } from '@angular/core';
import { ToastController, AlertController } from "ionic-angular";
import { TranslateService } from "@ngx-translate/core";
import { Base } from "../../models/base.model";

@Injectable()
export class MessageProvider {

  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public translate: TranslateService
  ) {
  }

  toast(message: string): void {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 4000,
      position: 'top'
    });

    toast.present();
  }

  toastSave(): void {
    this.translate.get('SAVE_SUCCESS').subscribe(value => {
      this.toast(value);
    });
  }

  toastDelete(): void {
    this.translate.get('DELETE_SUCCESS').subscribe(value => {
      this.toast(value);
    });
  }

  toastPasswordInvalid(): void {
    this.translate.get('PASSWORD_INVALID').subscribe(value => {
      this.toast(value);
    });
  }

  toastPasswordNotConfirmed(): void {
    this.translate.get('PASSWORD_NOT_MATCH').subscribe(value => {
      this.toast(value);
    });
  }

  confirmSave(callback: (dt: Base) => void): void {
    let keys: string[] = ['SAVE_MESSAGE', 'CANCEL', 'OK'];

    this.translate.get(keys).subscribe(values => {
      const alert = this.alertCtrl.create({
        message: values[keys[0]],
        buttons: [
          {
            text: values[keys[1]],
            role: 'cancel'
          },
          {
            text: values[keys[2]],
            handler: callback
          }
        ]
      });

      alert.present();
    });
  }

  confirmDelete(callback: (dt: Base) => void): void {
    let keys: string[] = ['DELETE_MESSAGE', 'CANCEL', 'OK'];

    this.translate.get(keys).subscribe(values => {
      const alert = this.alertCtrl.create({
        message: values[keys[0]],
        buttons: [
          {
            text: values[keys[1]],
            role: 'cancel'
          },
          {
            text: values[keys[2]],
            handler: callback
          }
        ]
      });

      alert.present();
    });
  }

}
