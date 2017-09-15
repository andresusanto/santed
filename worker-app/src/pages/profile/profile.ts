import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ClockPage} from '../../pages/clock/clock';
import {ProjectPage} from '../../pages/project/project';
import {NotificationPage} from '../../pages/notif/notif';
import {AbsencePage} from '../../pages/absence/absence';
import {LicensePage} from '../../pages/license/license';
import {RedTicketPage} from '../../pages/redticket/redticket';
import {SafetyPage} from '../../pages/safety/safety';
import {BluetoothService} from '../../services/BluetoothService';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  constructor(public nav: NavController, private bluetoothService: BluetoothService) {
    this.bluetoothService.startScanBackground();
  }

  goToClock() {
    this.nav.push(ClockPage);
  }

  goToProject() {
    this.nav.push(ProjectPage);
  }

  goToAbsence() {
    this.nav.push(AbsencePage);
  }

  goToNotif() {
    this.nav.push(NotificationPage);
  }

  goToLicense() {
    this.nav.push(LicensePage);
  }

  goToSafety() {
    this.nav.push(SafetyPage);
  }

  goToRedTicket() {
    this.nav.push(RedTicketPage);
  }
}
