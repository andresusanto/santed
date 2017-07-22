import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-redticket',
  templateUrl: 'redticket.html',
})
export class RedTicketPage {
  constructor(public nav: NavController) {}

  goToPLog() {
    //this.nav.push(PLogPage);
  }

  goBack(){
    this.nav.pop();
  }
}
