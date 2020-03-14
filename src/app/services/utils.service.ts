import { Injectable } from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(public toastCtrl: ToastController) { }
  async presentToast(textMessage: string, toastColor: string) {
    const  toast = await this.toastCtrl.create({
      message: textMessage,
      color: toastColor,
      duration: 3000,
      position: 'bottom'
    });
    await toast.present();
  }
}
