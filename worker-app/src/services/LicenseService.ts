import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
  
export class LicenseService {

    url = 'http://santed.susan.to:8000/license';

    static get parameters() {
        return [[Http]];
    }

    constructor(private http:Http) { }
  
    list() {
        // TODO: Currently use hardcoded user, should use auth token instead
        const user = '50004563';
        const fullUrl = `${this.url}/find?user=${user}`;
        const response = this.http.get(fullUrl).map(res => res.json());
        return response;
    }

    get(id) {
        const fullUrl = `${this.url}/findById/${id}`;
        const response = this.http.get(fullUrl).map(res => res.json());
        return response;
    }
}