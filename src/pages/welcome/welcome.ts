import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignInPage } from '../sign-in/sign-in';
import { SignUpPage } from '../sign-up/sign-up';
import { GooglePlus } from '@ionic-native/google-plus';
/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private googlePlus: GooglePlus) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }
  signin(){
  	this.navCtrl.push(SignInPage);
  }
  signup(){
  	this.navCtrl.push(SignUpPage);
  }
  google(){
    var gKey = '1010364927244-amo74h32kdjjmm7dtj5lri3nqihhja0r.apps.googleusercontent.com';
    this.googlePlus.login({
          'scopes':'', //// optional, space-separated list of scopes, If not included or empty, defaults to 'profile' and 'email'
          'webClientId': gKey, // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
          'offline': true
        }).then((res) => {
          alert(res);
            console.log(gKey);
            console.log(JSON.stringify(res));
        }, (err) => {
          alert(err);
          console.log(gKey);
            console.log(JSON.stringify(err));
        });
  }
  facebook(){

  }
}
