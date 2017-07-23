import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';


@Component({
  selector: 'page-clock',
  templateUrl: 'clock.html',
})
export class ClockPage {
  constructor(public nav: NavController) {}
  goBack(){
        this.nav.pop();
    }
}
