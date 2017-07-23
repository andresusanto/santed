import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ClockPage} from '../../pages/clock/clock';
import {ProjectPage} from '../../pages/project/project';
import {NotificationPage} from '../../pages/notif/notif';
import {AbsencePage} from '../../pages/absence/absence';
import {LicensePage} from '../../pages/license/license';
import {RedTicketPage} from '../../pages/redticket/redticket';
import {SafetyPage} from '../../pages/safety/safety';
import {BluetoothSerial} from '@ionic-native/bluetooth-serial';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  constructor(public nav: NavController, private bluetoothSerial: BluetoothSerial) {
    if (!this.bluetoothSerial.isEnabled) {
      this.bluetoothSerial.enable().then(() => {
        this.bluetoothSerial.setDiscoverable(0);
        this.continiousTransmit();
      });
    } else {
      this.continiousTransmit();
    }
  }

  continiousTransmit() {
    this.bluetoothSerial.list().then((data) => {
      const result = {
        data: [],
      };
      data.forEach((d) => {
        if (d.name && d.name.startsWith("x:")) {
          const dataInName = JSON.parse(d.name.substr(3));
          dataInName.data && dataInName.data.forEach((dd) => {
            result.data.push({
              id: dd.id,
              type: dd.type,
              value: dd.value,
            });
          });
        } else {
          // TODO: Check for beacon type
          result.data.push(d);
        }
      });
      const newName = "x:" + JSON.stringify(result);
      this.bluetoothSerial.setName(newName)
    });
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
