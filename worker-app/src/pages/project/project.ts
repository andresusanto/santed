import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ProjectService} from '../../services/ProjectService';
import {PLogPage} from '../../pages/plog/plog';

@Component({
  selector: 'page-project',
  templateUrl: 'project.html',
  providers: [ProjectService],
})
export class ProjectPage {

  projectClocking = [];
  projectActive = [];
  projectFuture = [];
  projectPast = [];
  isLoading = true;
  isError = false;

  ionViewDidEnter() {
      this.loadData();
  }

  ionViewDidLeave() {
    this.clear();
  }

  clear() {
    this.projectClocking = [];
    this.projectActive = [];
    this.projectFuture = [];
    this.projectPast = [];
    this.isLoading = true;
    this.isError = false;
  }
  
  loadData() {
    this.projectService.list().subscribe((data) => {
      this.isLoading = false;
      data.forEach((d) => {
        const startDate = Date.parse(d.startDate);
        const endDate = Date.parse(d.endDate);
        const now = Date.now();
        if (d.status === 'Pending') {
          this.projectClocking.push(d);
        } else if (endDate < now) {
          this.projectPast.push(d);
        } else if (startDate > now) {
          this.projectFuture.push(d);
        } else {
          this.projectActive.push(d);
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

  constructor(public nav: NavController, private projectService: ProjectService) {}

  approve(id) {
    event.stopPropagation();
    this.clear();
    this.projectService.approve(id).subscribe((data) => {
      this.loadData();
    });
  }

  reject(id) {
    event.stopPropagation();
    this.clear();
    this.projectService.reject(id).subscribe((data) => {
      this.loadData();
    });
  }

  goToPLog(id) {
    this.nav.push(PLogPage, { id: id });
  }

  goBack(){
    this.nav.pop();
  }
  
}
