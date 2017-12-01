import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, Events, AlertController } from 'ionic-angular';
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
    public menuCtrl: MenuController,
    public events: Events,
    public alertCtrl: AlertController) {
    this.buildMenu();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.verifySession();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // events
      this.events.subscribe('user:login', (userInfo) => {
        this.login();
      });
      this.events.subscribe('user:register', (userInfo) => {
        this.signup();
      });
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
        console.log('with localStorage auth_token');
        this.menuWithSession();
      }
      else {
        console.log('without localStorage auth_token');
        this.menuWithoutSession();
      }
    }
    else {
      console.log('without localStorage userData');
      this.menuWithoutSession();
    }
  }
  /** create side menu content*/
  buildMenu() {
    this.pages = [
      { icon: 'md-apps', title: 'Home', component: HomePage }
    ];
  }
  /** when user doesn't has session*/
  menuWithoutSession() {
    //console.log('unauthenticatedMenu');
    this.rootPage = WelcomePage;
    this.menuCtrl.enable(false,'leftMenu');
  }
  /** when user  has session*/
  menuWithSession() {
    //console.log('authenticatedMenu');
    this.rootPage = HomePage;
    this.menuCtrl.enable(true,'leftMenu');
  }
  /** login in app */
  login(){
    this.nav.setRoot(HomePage);
    this.menuWithSession();
  } 
  /** Ask before to logout */
  exitApp(){
    let confirm = this.alertCtrl.create({
      title: 'End session?',
      message: 'Are you sure to finish session',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
            this.logout();
          }
        }
      ]
    });
    confirm.present();
  }
  /** logout */
  logout(){
    this.nav.setRoot(WelcomePage);
    this.menuWithoutSession();
  }
  /** Register new user */
  signup(){
    this.login();
  }
}
