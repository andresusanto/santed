import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IonicApp, IonicModule } from 'ionic-angular';

import { BazaarApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { ClockPage } from '../pages/clock/clock';
import { ProjectPage } from '../pages/project/project';
import { AbsencePage } from '../pages/absence/absence';
import { AbsenceDetailPage } from '../pages/absence-detail/absence-detail';
import { NotificationPage } from '../pages/notif/notif';
import { AbsenceAddPage } from '../pages/absence-add/absence-add';
import { LicensePage } from '../pages/license/license';
import { LicenseDetailPage } from '../pages/license-detail/license-detail';
import { RedTicketDetailPage } from '../pages/redticket-detail/redticket-detail';
import { RedTicketPage } from '../pages/redticket/redticket';
import { PLogPage } from '../pages/plog/plog';
import { SafetyPage } from '../pages/safety/safety';
import { HomePage } from '../pages/home/home';
import { ProductlPage } from '../pages/productl/productl';
import { ProductdPage } from '../pages/productd/productd';
import { CartPage } from '../pages/cart/cart';
import { CheckoutPage } from '../pages/checkout/checkout';
import { HttpModule } from '@angular/http';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


const pages = [ LoginPage, ProfilePage, ClockPage, ProjectPage, AbsencePage, AbsenceAddPage, AbsenceDetailPage, NotificationPage, LicensePage, RedTicketPage, PLogPage, SafetyPage, HomePage, ProductlPage, ProductdPage,
    CartPage, CheckoutPage, RedTicketDetailPage, LicenseDetailPage];

const nativeProviders = [ SplashScreen, StatusBar, BluetoothSerial ];


@NgModule({
  declarations: [
    BazaarApp,
    pages
  ],
  imports: [
    BrowserModule,
    HttpModule,
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
