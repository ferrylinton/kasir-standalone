import { ToastController, AlertController, Alert, Toast, Events } from "ionic-angular";
import { TranslateService } from "@ngx-translate/core";
import { Storage } from '@ionic/storage';
import { User } from "../../models/user.model";
import { LOGGED_USER, DETAIL } from "../../constant/constant";
import { Base } from "../../models/base.model";

export abstract class BasePage {

    private cancelTxt: string;

    private okTxt: string;

    private confirmTxt: string;

    private reloadTxt: string;

    loggedUser: User;

    constructor(
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public translate: TranslateService,
        public storage: Storage,
        public events: Events
    ) {

        storage.get(LOGGED_USER).then((val) => {
            this.loggedUser = JSON.parse(val);
        });

        this.translate.get(['BUTTON.OK', 'BUTTON.CANCEL', 'TITLE.CONFIRM', 'MESSAGE.RELOAD_PAGE']).subscribe(values => {
            this.okTxt = values['BUTTON.OK'];
            this.cancelTxt = values['BUTTON.CANCEL'];
            this.confirmTxt = values['TITLE.CONFIRM'];
            this.reloadTxt = values['MESSAGE.RELOAD_PAGE'];
        }, error => {
            this.okTxt = 'Ok';
            this.cancelTxt = 'Cancel';
            this.confirmTxt = 'Confirm';
            this.reloadTxt = 'Reload page';
        });
    }

    reloadPage(page: string): void {
        this.showToast(this.reloadTxt);
        this.events.publish(DETAIL, page);
    }

    showToast(message: string): void {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });

        toast.present();
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
        this.translate.get('MESSAGE.DELETE_SUCCESS', { data: data }).subscribe((value: string) => {
            message = value;
        });

        this.showToast(message);
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
        this.translate.get('MESSAGE.DELETE_CONFIRM', { data: data }).subscribe((res: string) => {
            message = res;
        });

        this.showConfirm(message, callback);
    }

    showConfirm(message: string, callback: (dt: Base) => void): void {
        let alert = this.alertCtrl.create({
            title: this.confirmTxt,
            message: message,
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