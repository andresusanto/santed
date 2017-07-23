import {Component} from '@angular/core';
import {NavController, NavParams} from "ionic-angular";
import {RedTicketService} from '../../services/RedTicketService';

@Component({
  selector: 'page-redticket-detail',
  templateUrl: 'redticket-detail.html',
  providers: [RedTicketService],
})
export class RedTicketDetailPage {

  redticket = {};
  isLoading = true;
  isError = false;

  constructor(public nav: NavController, public navParams: NavParams, private redTicketService: RedTicketService) {
    const id = navParams.get("id");
    this.redTicketService.get(id).subscribe((data) => {
        this.redticket = data;
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
