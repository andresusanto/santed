import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CartPage} from '../cart/cart';

@Component({
  selector: 'page-productl',
  templateUrl: 'productl.html',
})
export class ProductlPage {
  constructor(public nav: NavController) {}

  goToCart() {
	  this.nav.setRoot(CartPage);
  }

  getItems(ev) {}

}
