import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observation } from '../models/observation';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class ObservationService {
private url= environment.host + '/api/v1/observations/';

  constructor(private http: Http) { }

  getObservations() {
    return this.http.get(this.url + 'observationList', this.generateHeaders()).map((response: Response) => response.json());
  }

  sendObservation(observation: Observation) {
    return this.http.post(this.url + 'saveObservation', JSON.stringify(observation), this.generateJSONHeaders());
  }

  getObservation(id: number) {
    return this.http.get(this.url + 'get/' + id, this.generateHeaders());
  }

  deleteObservation(id: number) {
    return this.http.delete(this.url + 'delete/' + id, this.generateHeaders());
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
