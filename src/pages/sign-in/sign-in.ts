import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }
  /** login in app */
  login(){
  	console.log('sigin login');
  	this.events.publish('user:login', {mail:'holo', password: '123456'});
  } 
}
