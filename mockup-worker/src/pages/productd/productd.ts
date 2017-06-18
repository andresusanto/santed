import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CartPage} from '../cart/cart';

@Component({
  selector: 'page-productd',
  templateUrl: 'productd.html',
})
export class ProductdPage {
  constructor(public nav: NavController) {}

  product: string = "details";

  goToCart() {
	this.nav.setRoot(CartPage);
  }
}
