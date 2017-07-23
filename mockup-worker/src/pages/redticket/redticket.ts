import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RedTicketService} from '../../services/RedTicketService';
import {RedTicketDetailPage} from '../../pages/redticket-detail/redticket-detail';

@Component({
  selector: 'page-redticket',
  templateUrl: 'redticket.html',
  providers: [RedTicketService],
})
export class RedTicketPage {

  redTicketRequested = [];
  redTicketR = [];
  redTicketTCB = [];
  redTicketTSD = [];
  redTicketPSD = [];
  isLoading = true;
  isError = false;

  constructor(public nav: NavController, private redTicketService: RedTicketService) {
    redTicketService.list().subscribe((data) => {
      this.isLoading = false;
      data.forEach((d) => {
        if (d.status === 'requested') {
          this.redTicketRequested.push(d);
        } else if (d.outcome === 'R') {
          this.redTicketR.push(d);
        } else if (d.outcome === 'TCB') {
          this.redTicketTCB.push(d);
        } else if (d.outcome === 'TSD') {
          this.redTicketTSD.push(d);
        } else if (d.outcome === 'PSD') {
          this.redTicketPSD.push(d);
        }
      })
    }, (err) => {
      this.isLoading = false;
      this.isError = false;
    });
  }

  goToRedTicketDetail(id) {
    this.nav.push(RedTicketDetailPage, { id: id });
  }

  goBack(){
    this.nav.pop();
  }
}
