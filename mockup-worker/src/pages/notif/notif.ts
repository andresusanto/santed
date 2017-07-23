import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {NotificationService} from '../../services/NotificationService';

@Component({
  selector: 'page-notif',
  templateUrl: 'notif.html',
  providers: [NotificationService],
})
export class NotificationPage {

  notifRead = [];
  notifUnread = [];
  isLoading = true;
  isError = false;

  ionViewDidEnter() {
      return this.loadData();
  }
  
  loadData() {
    this.notifRead = [];
    this.notifUnread = [];
    this.isLoading = true;
    this.isError = false;
    this.notificationService.list().subscribe((data) => {
      this.isLoading = false;
      data.forEach((d) => {
        if (d.read) {
          this.notifRead.push(d);
        } else {
          this.notifUnread.push(d);
        }
      })
    }, (err) => {
      this.isLoading = false;
      this.isError = false;
    });
  }

  constructor(public nav: NavController, private notificationService: NotificationService) { }

  goToAddNotif() {
    // this.nav.push(AbsenceAddPage);
  }

  goBack(){
    this.nav.pop();
  }
}
