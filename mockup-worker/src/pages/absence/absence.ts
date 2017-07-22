import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-absence',
  templateUrl: 'absence.html',
})
export class AbsencePage {
  constructor(public nav: NavController) {}

  goToPLog() {
    //this.nav.push(PLogPage);
  }

  goBack(){
    this.nav.pop();
  }
}
