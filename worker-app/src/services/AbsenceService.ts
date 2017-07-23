import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
  
export class AbsenceService {

    url = 'http://santed.susan.to:8000/leave';

    static get parameters() {
        return [[Http]];
    }

    constructor(private http:Http) { }
  
    list() {
        // TODO: Currently use hardcoded persNo, should use auth token instead
        const persNo = '201267';
        const fullUrl = `${this.url}/find?persNo=${persNo}`;
        const response = this.http.get(fullUrl).map(res => res.json());
        return response;
    }

    get(id) {
        const fullUrl = `${this.url}/findById/${id}`;
        const response = this.http.get(fullUrl).map(res => res.json());
        return response;
    }

    create(data) {
        // TODO: Currently use hardcoded persNo, should use auth token instead
        data.persNo = '201267';
        data.status = 'requested';
        const response = this.http.post(this.url, data).map(res => res.json());
        return response;
    }
}