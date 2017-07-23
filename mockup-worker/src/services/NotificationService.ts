import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
  
export class NotificationService {

    url = 'http://santed.susan.to:8000/notification';

    static get parameters() {
        return [[Http]];
    }

    constructor(private http:Http) { }
  
    list() {
        // TODO: Currently use hardcoded user, should use auth token instead
        const user = '1';
        const fullUrl = `${this.url}/find?user=${user}`;
        const response = this.http.get(fullUrl).map(res => res.json());
        return response;
    }
}