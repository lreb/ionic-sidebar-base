import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  register(){
  	console.log('user register');
  	this.events.publish('user:register', {mail:'holo', password: '123456', confirm_password: '123456'});
  }

}
