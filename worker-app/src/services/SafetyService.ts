import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
  
export class SafetyService {

    url = 'http://santed.susan.to:8000/site';

    static get parameters() {
        return [[Http]];
    }

    constructor(private http:Http) { }
  
    list() {
        const fullUrl = `${this.url}/find`;
        const response = this.http.get(fullUrl).map(res => res.json());
        return response;
    }
}