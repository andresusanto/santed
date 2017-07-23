import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AbsenceService} from '../../services/AbsenceService';
import {ToastController} from 'ionic-angular';

@Component({
  selector: 'page-absence-add',
  templateUrl: 'absence-add.html',
  providers: [AbsenceService],
})
export class AbsenceAddPage {

  startDate: any;
  endDate: any;
  type: string;
  notes: string;


  constructor(public nav: NavController, private toastCtrl: ToastController, private absenceService: AbsenceService) { }

  goBack(){
    this.nav.pop();
  }

  submitAbsence() {
    if (!this.startDate || !this.endDate || !this.type || !this.notes) {
      let toast = this.toastCtrl.create({
        message: 'Incomplete data',
        duration: 3000,
        position: 'bottom',
        cssClass: 'error-toast',
      });
      toast.present();
    } else {
      const data = {
        startDate: this.startDate,
        endDate: this.endDate,
        type: this.type,
        notes: this.notes,
      }
      this.absenceService.create(data).subscribe(() => {
        this.nav.pop()
      });
    }
  }
}
