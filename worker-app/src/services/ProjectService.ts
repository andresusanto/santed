import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
  
export class ProjectService {

    url = 'http://santed.susan.to:8000/project';
    // TODO: Currently use hardcoded name, should use auth token instead
    persNo = 108478

    static get parameters() {
        return [[Http]];
    }

    constructor(private http:Http) { }
  
    list() {
        const fullUrl = `${this.url}/findByMiner?persNo=${this.persNo}`;
        const response = this.http.get(fullUrl).map(res => res.json());
        return response;
    }

    get(id) {
        const fullUrl = `${this.url}/findById/${id}`;
        const response = this.http.get(fullUrl).map(res => res.json());
        return response;
    }

    approve(id) {
        const data = {
            id: id,
            persNo: this.persNo,
        }
        const fullUrl = `${this.url}/accept`;
        const response = this.http.post(fullUrl, data).map(res => res.json());
        return response;
    }

    reject(id) {
        const data = {
            id: id,
            persNo: this.persNo,
        }
        const fullUrl = `${this.url}/reject`;
        const response = this.http.post(fullUrl, data).map(res => res.json());
        return response;
    }
}