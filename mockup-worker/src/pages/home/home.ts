import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CartPage} from '../cart/cart';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  constructor(public nav: NavController) {}

  getItems(ev) {}

  goToCart() {
	  this.nav.setRoot(CartPage);
  }
}
