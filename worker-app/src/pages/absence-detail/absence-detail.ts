import {Component} from '@angular/core';
import {NavController, NavParams} from "ionic-angular";
import {AbsenceService} from '../../services/AbsenceService';

@Component({
  selector: 'page-absence-detail',
  templateUrl: 'absence-detail.html',
  providers: [AbsenceService],
})
export class AbsenceDetailPage {

  absence = {};
  isLoading = true;
  isError = false;

  constructor(public nav: NavController, public navParams: NavParams, private absenceService: AbsenceService) {
    const id = navParams.get("id");
    this.absenceService.get(id).subscribe((data) => {
        this.absence = data;
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
