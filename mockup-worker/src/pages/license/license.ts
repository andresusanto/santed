import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-license',
  templateUrl: 'license.html',
})
export class LicensePage {
  constructor(public nav: NavController) {}

  goToPLog() {
    //this.nav.push(PLogPage);
  }

  goBack(){
    this.nav.pop();
  }
}
