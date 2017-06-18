import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CartPage} from '../../pages/cart/cart';
import {ClockPage} from '../../pages/clock/clock';
import {ProjectPage} from '../../pages/project/project';
import {SafetyPage} from '../../pages/safety/safety';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  constructor(public nav: NavController) {}
  
  goToCart() {
	  this.nav.setRoot(CartPage);
  }

  goToClock() {
    this.nav.push(ClockPage);
  }

  goToProject() {
    this.nav.push(ProjectPage);
  }

  goToSafety() {
    this.nav.push(SafetyPage);
  }
}
