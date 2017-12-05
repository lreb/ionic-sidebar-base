import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, Events, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { WelcomePage } from '../pages/welcome/welcome';
import { HelpPage } from '../pages/help/help';
import { SettingsPage } from '../pages/settings/settings';
import { MyAccountPage } from '../pages/my-account/my-account';

import {JwtHelper} from 'angular2-jwt';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = WelcomePage;
  // menu
  pages: Array<{icon: string, title: string, component: any}>;
  // jwt
  jwtHelper: JwtHelper = new JwtHelper();
  // user
  email: any;
  authToekn: any;
  serverCode: any;
  userId: any;
  displayName: any;
  familyName: any;
  givenName: any;
  imageUrl: any;
  // facebook
  isLoggedIn:boolean = false;
  users: any;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public menuCtrl: MenuController,
    public events: Events,
    public alertCtrl: AlertController,
    private googlePlus: GooglePlus,
    private facebook:Facebook) {
    // verify facebook connection status
    this.facebook.getLoginStatus()
    .then(res => {
      console.log(res.status);
      if(res.status === "connect") {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log(e));
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
      this.events.subscribe('user:google', (userInfo) => {
        this.googleSession();
      });
      this.events.subscribe('user:facebook', (userInfo) => {
        this.facebookSession();
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
      { icon: 'md-home', title: 'Home', component: HomePage },
      { icon: 'md-person', title: 'My Account', component: MyAccountPage },
      { icon: 'md-settings', title: 'Settings', component: SettingsPage },
      { icon: 'md-help-circle', title: 'Help', component: HelpPage }
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
  /** Google */
  googleSession(){
    // https://www.djamware.com/post/59094a2280aca7414e78a63d/ionic-3-google-plus-authentication-tutorial
    // https://javebratt.com/ionic-google-login/
    var gKey = '1010364927244-amo74h32kdjjmm7dtj5lri3nqihhja0r.apps.googleusercontent.com';
    this.googlePlus.login({
      'scopes':'', //// optional, space-separated list of scopes, If not included or empty, defaults to 'profile' and 'email'
      'webClientId': gKey, // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true
    }).then((res) => {
      console.log(gKey);
      alert(JSON.stringify(res));
      console.log(JSON.stringify(res));
      console.log('email: ' + res.email);
      console.log('idToken: ' + res.idToken);
      console.log('serverAuthCode: ' + res.serverAuthCode);
      console.log('userId: ' + res.userId);
      console.log('displayName: ' + res.displayName);
      console.log('familyName: ' + res.familyName);
      console.log('givenName: ' + res.givenName);
      console.log('imageUrl: ' + res.imageUrl);

      this.login();
    }, (err) => {
      alert(err);
      console.log(gKey);
        console.log(JSON.stringify(err));
    });
  }
  /** Facebook */
  facebookSession(){
    // https://www.djamware.com/post/59ad3a0c80aca768e4d2b135/login-with-ionic-3-and-cordova-native-facebook-connect-plugin
    this.facebook.login(['public_profile', 'user_friends', 'email'])
    .then(res => {
      if(res.status === "connected") {
        this.isLoggedIn = true;
        this.getUserDetail(res.authResponse.userID);
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log('Error logging into Facebook', e));
  }
  // facebook get user details
  getUserDetail(userid) {
  this.facebook.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
    .then(res => {
      console.log(res);
      this.users = res;
    })
    .catch(e => {
      console.log(e);
    });
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
    // logout google
    if (this.platform.is('cordova')) {
        this.googlePlus.logout().then(() => {
          console.log("logged out");
      });
    }
    this.nav.setRoot(WelcomePage);
    this.menuWithoutSession();
  }
  /** Register new user */
  signup(){
    this.login();
  }
}
