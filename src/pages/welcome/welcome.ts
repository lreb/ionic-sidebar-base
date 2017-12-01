import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }
  /** Go to signi page*/
  signin(){
  	this.navCtrl.push(SignInPage);
  }
  /** Go to signup page*/
  signup(){
  	this.navCtrl.push(SignUpPage);
  }
  /** Initialize session with Google*/
  google(){
    console.log('user google');
    this.events.publish('user:google');
  }
  /**initialize session with Facebook*/
  facebook(){
    console.log('user facebook');
    this.events.publish('user:facebook');
  }
}
