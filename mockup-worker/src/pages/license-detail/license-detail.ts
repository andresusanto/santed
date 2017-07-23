import {Component} from '@angular/core';
import {NavController, NavParams} from "ionic-angular";
import {LicenseService} from '../../services/LicenseService';

@Component({
  selector: 'page-license-detail',
  templateUrl: 'license-detail.html',
  providers: [LicenseService],
})
export class LicenseDetailPage {

  license = {};
  isLoading = true;
  isError = false;

  constructor(public nav: NavController, public navParams: NavParams, private licenseService: LicenseService) {
    const id = navParams.get("id");
    this.licenseService.get(id).subscribe((data) => {
        this.license = data;
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
