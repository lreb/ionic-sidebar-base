import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { WelcomePage } from '../pages/welcome/welcome';

import {JwtHelper} from 'angular2-jwt';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = WelcomePage;

  pages: Array<{icon: string, title: string, component: any}>;

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public menuCtrl: MenuController) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
    /** verify if user has session session. we need validate if there is token and it is valid*/
  verifySession() {
    if (localStorage.getItem('userData') !== null) {
      if (!this.jwtHelper.isTokenExpired(JSON.parse(localStorage.getItem('userData')).auth_token)) {
        this.authenticatedMenu();
      }
      else {
        //console.log('without localStorage');
        this.unauthenticatedMenu();
      }
    }
    else {
      //console.log('without localStorage');
      this.unauthenticatedMenu();
    }
  }
  /** create side menu content*/
  buildMenu() {
    this.pages = [
      { icon: 'md-apps', title: 'Home', component: HomePage }
    ];
  }
  /** when user doesn't has session*/
  unauthenticatedMenu() {
    //console.log('unauthenticatedMenu');
    this.rootPage = WelcomePage;
    this.menuCtrl.enable(false);
  }
  /** when user  has session*/
  authenticatedMenu() {
    //console.log('authenticatedMenu');
    this.rootPage = HomePage;
    this.menuCtrl.enable(true);
  }
}
