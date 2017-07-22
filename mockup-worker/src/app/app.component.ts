import {Component, ViewChild} from '@angular/core';
import {Platform, Nav, MenuController} from 'ionic-angular';
import {LoginPage} from '../pages/login/login';
import {ProfilePage} from '../pages/profile/profile';
import {ClockPage} from '../pages/clock/clock';
import {ProjectPage} from '../pages/project/project';
import {AbsencePage} from '../pages/absence/absence';
import {LicensePage} from '../pages/license/license';
import {RedTicketPage} from '../pages/redticket/redticket';
import {PLogPage} from '../pages/plog/plog';
import {SafetyPage} from '../pages/safety/safety';
import {HomePage} from '../pages/home/home';
import {ProductlPage} from '../pages/productl/productl';
import {ProductdPage} from '../pages/productd/productd';
import {CartPage} from '../pages/cart/cart';
import {CheckoutPage} from '../pages/checkout/checkout';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



interface PageObj {
  title: string;
  component: any;
  index?: number;
}

@Component({
  templateUrl: 'app.html'
})
export class BazaarApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageObj[] = [
    { title: 'Login', component: LoginPage},
    { title: 'Profile', component: ProfilePage},
    { title: 'Clock', component: ClockPage},
    { title: 'Project', component: ProjectPage},
    { title: 'Project Logs', component: PLogPage},
    { title: 'Absences', component: AbsencePage},
    { title: 'Licenses', component: LicensePage},
    { title: 'Red tickets', component: RedTicketPage},
    { title: 'Safety', component: SafetyPage},
    { title: 'Home', component: HomePage},
    { title: 'Product Details', component: ProductdPage},
    { title: 'Product List', component: ProductlPage},
    { title: 'Cart', component: CartPage},
    { title: 'Checkout', component: CheckoutPage},
  ];
  rootPage: any = LoginPage;
  constructor(
    private menu: MenuController,private platform: Platform,
    private statusBar: StatusBar, private splashScreen: SplashScreen

  ) {
    // Call any initial plugins when ready
    platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }

  openPage(page: PageObj) {
	   this.nav.setRoot(page.component);
  }

}
