import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
  
export class RedTicketService {

    url = 'http://santed.susan.to:8000/red_ticket';

    static get parameters() {
        return [[Http]];
    }

    constructor(private http:Http) { }
  
    list() {
        // TODO: Currently use hardcoded name, should use auth token instead
        const name = 'Etienne,Schubach(EH)';
        const fullUrl = `${this.url}/find?name=${name}`;
        const response = this.http.get(fullUrl).map(res => res.json());
        return response;
    }

    get(id) {
        const fullUrl = `${this.url}/findById/${id}`;
        const response = this.http.get(fullUrl).map(res => res.json());
        return response;
    }
}