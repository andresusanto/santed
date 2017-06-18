import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IonicApp, IonicModule } from 'ionic-angular';

import { BazaarApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { ClockPage } from '../pages/clock/clock';
import { ProjectPage } from '../pages/project/project';
import { PLogPage } from '../pages/plog/plog';
import { SafetyPage } from '../pages/safety/safety';
import { HomePage } from '../pages/home/home';
import { ProductlPage } from '../pages/productl/productl';
import { ProductdPage } from '../pages/productd/productd';
import { CartPage } from '../pages/cart/cart';
import { CheckoutPage } from '../pages/checkout/checkout';


import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


const pages = [ LoginPage, ProfilePage, ClockPage, ProjectPage, PLogPage, SafetyPage, HomePage, ProductlPage, ProductdPage,
    CartPage, CheckoutPage];

const nativeProviders = [ SplashScreen, StatusBar ];


@NgModule({
  declarations: [
    BazaarApp,
    pages
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(BazaarApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    BazaarApp,
    pages
  ],
  providers: [ nativeProviders ]

})
export class AppModule {}
