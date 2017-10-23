import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Telescope } from '../models/telescope';
import 'rxjs/add/operator/map';

@Injectable()
export class TelescopeService {

  private url= 'http://localhost:8080/api/v1/telescopes/';

  constructor(private http: Http) { }

  getTelescopes() {
    return this.http.get(this.url + 'telescopeList', this.generateHeaders()).map((response: Response) => response.json());
  }

  sendTelescope(telescope: Telescope) {
    return this.http.post(this.url + 'saveTelescope', JSON.stringify(telescope), this.generateJSONHeaders());
  }

  getTelescope(id: number) {
    return this.http.get(this.url + 'get/' + id, this.generateHeaders());
  }

  deleteTelescope(id: number) {
    return this.http.get(this.url + 'delete/' + id, this.generateHeaders());
  }

  private generateJSONHeaders() {
        // create authorization header for POST
        const headers = new Headers({
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('SGD_xAuthToken')
        });
        return new RequestOptions({ headers: headers });
  }

  private generateHeaders() {
        // create authorization header for GET
        const headers = new Headers({
          'x-auth-token': localStorage.getItem('SGD_xAuthToken')
        });
        return new RequestOptions({ headers: headers });
  }
}
