import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
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
//let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
export class SignUpPage implements Validators {
  form : FormGroup;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public events: Events,
  	public formBuilder: FormBuilder) {
  	this.form = formBuilder.group({
  		emailVal: ['', Validators.compose([Validators.required, Validators.email])],
  		passwordVal: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
  		passwordConfirmVal: ['', Validators.compose([Validators.required, Validators.minLength(5), passwordValidator.passwordMatch('passwordVal')])]
  	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  register(){
  	console.log('user register');
  	this.events.publish('user:register', {mail:'holo', password: '123456', confirm_password: '123456'});
  }

}
/** verify if passwords are equals */
export class passwordValidator {
  static passwordMatch(field_name): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      let input = control.value;
      let isValid = control.root.value[field_name] == input;
      if (!isValid)
        return {'equalTo': {isValid}};
      else
        return null;
    };
  }
}