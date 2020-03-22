import { Injectable } from '@angular/core';
import {ToastController} from '@ionic/angular';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(public toastCtrl: ToastController, private userService: UserService) { }
  async presentToast(textMessage: string, toastColor: string, second: number = 3000, pos: any = 'bottom') {
    const  toast = await this.toastCtrl.create({
      message: textMessage,
      color: toastColor,
      duration: second,
      position: pos
    });
    await toast.present();
  }
  isConnected(): boolean {
    if (window.localStorage.getItem('connected')) {
      return true;
    }
    return false;
  }
  logOut() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('userId');
    window.localStorage.removeItem('role');
    window.localStorage.removeItem('connected');
    this.userService.isConnected = false;
  }
  userRole(): boolean {
    if (window.localStorage.getItem('role') === 'admin') {
      return true;
    }
    return false;
  }
}
