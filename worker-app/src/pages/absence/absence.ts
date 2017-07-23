import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AbsenceService} from '../../services/AbsenceService';
import {AbsenceAddPage} from '../../pages/absence-add/absence-add';
import {AbsenceDetailPage} from '../../pages/absence-detail/absence-detail';

@Component({
  selector: 'page-absence',
  templateUrl: 'absence.html',
  providers: [AbsenceService],
})
export class AbsencePage {

  leaveRequested = [];
  leaveAccepted = [];
  leaveRejected = [];
  isLoading = true;
  isError = false;

  ionViewDidEnter() {
      this.loadData();
  }

  ionViewDidLeave() {
    this.clear();
  }

  clear() {
    this.leaveRequested = [];
    this.leaveAccepted = [];
    this.leaveRejected = [];
    this.isLoading = true;
    this.isError = false;
  }
  
  loadData() {
    this.absenceService.list().subscribe((data) => {
      this.isLoading = false;
      data.forEach((d) => {
        if (d.status === 'requested') {
          this.leaveRequested.push(d);
        } else if (d.status === 'rejected') {
          this.leaveAccepted.push(d);
        } else {
          this.leaveAccepted.push(d);
        }
      })
    }, (err) => {
      this.isLoading = false;
      this.isError = false;
    });
  }

  constructor(public nav: NavController, private absenceService: AbsenceService) { }

  doRefresh(refresher) {
    this.clear();
    this.loadData();
    refresher.complete();
  }

  goToAddAbsence() {
    this.nav.push(AbsenceAddPage);
  }

  goToAbsenceDetail(id) {
    this.nav.push(AbsenceDetailPage, { id: id });
  }

  goBack(){
    this.nav.pop();
  }
}
