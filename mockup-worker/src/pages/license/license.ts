import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LicenseService} from '../../services/LicenseService';
import {LicenseDetailPage} from '../../pages/license-detail/license-detail';

@Component({
  selector: 'page-license',
  templateUrl: 'license.html',
  providers: [LicenseService],
})
export class LicensePage {

  licenseCompleted = [];
  licenseCurrent = [];
  isLoading = true;
  isError = false;

  constructor(public nav: NavController, private licenseService: LicenseService) {
    licenseService.list().subscribe((data) => {
      this.isLoading = false;
      data.forEach((d) => {
        if (d.completionStatusId === 'CHKLIST_COMPLETE') {
          this.licenseCompleted.push(d);
        } else {
          this.licenseCurrent.push(d);
        }
      })
    }, (err) => {
      this.isLoading = false;
      this.isError = false;
    });
  }

  goToLicenseDetail(id) {
    this.nav.push(LicenseDetailPage, { id: id });
  }

  goBack(){
    this.nav.pop();
  }
}
