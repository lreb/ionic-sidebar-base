import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignInPage } from '../sign-in/sign-in';
import { SignUpPage } from '../sign-up/sign-up';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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

  }
  facebook(){

  }
}
