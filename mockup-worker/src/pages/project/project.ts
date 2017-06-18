import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PLogPage} from '../../pages/plog/plog';

@Component({
  selector: 'page-project',
  templateUrl: 'project.html',
})
export class ProjectPage {
  constructor(public nav: NavController) {}

  goToPLog() {
    this.nav.push(PLogPage);
  }

  goBack(){
    this.nav.pop();
  }
}
