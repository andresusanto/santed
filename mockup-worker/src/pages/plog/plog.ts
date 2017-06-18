import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';


@Component({
  selector: 'page-plog',
  templateUrl: 'plog.html',
})
export class PLogPage {
  constructor(public nav: NavController) {}
  goBack(){
        this.nav.pop();
    }
}
