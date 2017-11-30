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
    this.googlePlus.login({
          'webClientId': '780469554734-rpkej3o37on3p5maksp9klqjvj5hg0k7.apps.googleusercontent.com'
        }).then((res) => {
            console.log(res);
        }, (err) => {
            console.log(err);
        });
  }
  facebook(){

  }
}
