import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SafetyService} from '../../services/SafetyService';
import {SafetyDetailPage} from '../../pages/safety-detail/safety-detail';

@Component({
  selector: 'page-safety',
  templateUrl: 'safety.html',
  providers: [SafetyService],
})
export class SafetyPage {

  siteDanger = [];
  siteNormal = [];
  isLoading = true;
  isError = false;

  ionViewDidEnter() {
      this.loadData();
  }

  ionViewDidLeave() {
    this.clear();
  }

  clear() {
    this.siteDanger = [];
    this.siteNormal = [];
    this.isLoading = true;
    this.isError = false;
  }
  
  loadData() {
    this.safetyService.list().subscribe((data) => {
      this.isLoading = false;
      data.forEach((d) => {
        if (d.danger === true) {
          if (parseInt(d.temperature) > 60) {
            d.description = 'High temperature detected';
          } else if (parseInt(d.pressure) > 810) {
            d.description = 'High pressure detected';
          } else {
             d.description = 'Anomaly detected';
          }
          this.siteDanger.push(d);
        } else {
           d.description = 'Everything is normal';
          this.siteNormal.push(d);
        }
      })
    }, (err) => {
      this.isLoading = false;
      this.isError = false;
    });
  }

  doRefresh(refresher) {
    this.clear();
    this.loadData();
    refresher.complete();
  }
  
  constructor(public nav: NavController, private safetyService: SafetyService) {}

  goToSafetyDetail(id) {
    this.nav.push(SafetyDetailPage, { id: id });
  }

  goBack(){
    this.nav.pop();
  }
}
