import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CartPage} from '../cart/cart';

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  constructor(public nav: NavController) {}

  goToCart() {
	this.nav.setRoot(CartPage);
  }

}
