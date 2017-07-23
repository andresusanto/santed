import {Component} from '@angular/core';
import {NavController, NavParams} from "ionic-angular";
import {ProjectService} from '../../services/ProjectService';

@Component({
  selector: 'page-plog',
  templateUrl: 'plog.html',
    providers: [ProjectService],

})
export class PLogPage {
  project = {};
  isLoading = true;
  isError = false;

  constructor(public nav: NavController, public navParams: NavParams, private projectService: ProjectService) {
    const id = navParams.get("id");
    this.projectService.get(id).subscribe((data) => {
        this.project = data;
        this.isLoading = false;
        this.isError = false;
    }, (error) => {
        this.isLoading = false;
        this.isError = true;
    });
  }

  goBack(){
        this.nav.pop();
    }
}
