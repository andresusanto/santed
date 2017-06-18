import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CheckoutPage} from '../checkout/checkout';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  constructor(public nav: NavController) {}

  goToCheckout() {
	this.nav.setRoot(CheckoutPage);
  }
}
