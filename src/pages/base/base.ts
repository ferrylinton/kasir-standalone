import { ToastController, AlertController, Alert, Toast } from "ionic-angular";
import { TranslateService } from "@ngx-translate/core";
import { Storage } from '@ionic/storage';
import { User } from "../../models/user.model";
import { LOGGED_USER } from "../../constant/constant";
import { Base } from "../../models/base.model";

export abstract class BasePage {

    private cancelTxt: string;

    private okTxt: string;

    private confirmTxt: string;

    loggedUser: User;

    constructor(
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public translate: TranslateService,
        public storage: Storage
    ) {

        storage.get(LOGGED_USER).then((val) => {
            this.loggedUser = JSON.parse(val);
        });

        this.translate.get(['BUTTON.OK', 'BUTTON.CANCEL', 'TITLE.CONFIRM']).subscribe(values => {
            this.okTxt = values['BUTTON.OK'];
            this.cancelTxt = values['BUTTON.CANCEL'];
            this.confirmTxt = values['TITLE.CONFIRM'];
        }, error => {
            this.okTxt = 'Ok';
            this.cancelTxt = 'Cancel';
            this.confirmTxt = 'Confirm';
        });
    }

    showToast(data: string): void {
        let saveMessage = 'Add new data[' + data + '] is successfully'
        this.translate.get('MESSAGE.ADD_SUCCESS', { data: data }).subscribe((res: string) => {
            saveMessage = res;
        });

        let toast =  this.toastCtrl.create({
            message: saveMessage,
            duration: 3000,
            position: 'top'
        });

        toast.present();
    }

    showSaveConfirm(data: string,  callback: (dt: Base) => void): Alert {
        let saveMessage = 'Do you want to add new data[' + data + ']?'
        this.translate.get('MESSAGE.ADD_CONFIRM', { data: data }).subscribe((res: string) => {
            saveMessage = res;
        });

        let alert = this.alertCtrl.create({
            title: this.confirmTxt,
            message: saveMessage,
            buttons: [
                {
                    text: this.cancelTxt,
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
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