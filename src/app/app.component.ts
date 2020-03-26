import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {UtilsService} from './services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  username;
  url;
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Nos plats',
      url: '/plats',
      icon: 'restaurant'
    },
    {
      title: 'Menu du jour',
      url: '/menu',
      icon: 'pizza'
    },
    {
      title: 'Mes commandes',
      url: '/plats/commande',
      icon: 'cart'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private utilsService: UtilsService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.isAuthenticated();
    });
  }

  ngOnInit() {
    this.username = window.localStorage.getItem('username');
    this.url = 'http://localhost:1337' + window.localStorage.getItem('url');
  }

  isAuthenticated(): boolean {
    if (this.utilsService.isConnected()) {
      return true;
    }
    return false;
  }

  onDeconnecte() {
    this.utilsService.logOut();
  }
  connected() {
    return this.utilsService.isConnected();
  }
}
