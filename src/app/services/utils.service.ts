import { Injectable } from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(public toastCtrl: ToastController) { }
  async presentToast(textMessage: string, toastColor: string, second: number = 3000, pos: any = 'bottom') {
    const  toast = await this.toastCtrl.create({
      message: textMessage,
      color: toastColor,
      duration: second,
      position: pos
    });
    await toast.present();
  }
}
