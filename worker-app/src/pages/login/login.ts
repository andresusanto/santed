import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {NavController} from 'ionic-angular';
import {ProfilePage} from '../profile/profile';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public loginForm:any;
  public submitted = false;
  constructor(public nav: NavController, public form: FormBuilder) {
    this.loginForm = form.group({
      username: [''],
      password: ['']
    });
  }

  onLogin(event) {
    this.submitted = true;
	  this.nav.setRoot(ProfilePage);
  }

}
