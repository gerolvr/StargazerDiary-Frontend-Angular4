import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { AstroDataSearchResult } from '../models/astroDataSearchResult';

@Injectable()
export class AstrodataService {
  private url = 'http://localhost:8080/api/v1/astrodata/';
  private newSearchResultSubject = new Subject<AstroDataSearchResult>();
  private newSearchStartedSubject = new Subject<void>();
  private astroDataSearchResult: AstroDataSearchResult;

  constructor(private http: Http) { }

  newSearch(astronomicalObject) {
    this.newSearchStartedSubject.next();
    this.http.get(this.url + '/search/' + astronomicalObject, this.generateHeaders()).subscribe(
      resp => {
        this.astroDataSearchResult = resp.json();
        this.newSearchResultSubject.next(this.astroDataSearchResult);
      },
      err => {
        console.log(err);
      }
    );
  }

  getSearchResult(): Observable<AstroDataSearchResult> {
    return this.newSearchResultSubject.asObservable();
  }

  getNewSearchStarted() {
    return this.newSearchStartedSubject.asObservable();
  }

  search(astronomicalObject) {
    return this.http.get(this.url + '/search/' + astronomicalObject, this.generateHeaders());
  }

  private generateHeaders() {
    // create authorization header
    const headers = new Headers({
      'x-auth-token': localStorage.getItem('SGD_xAuthToken')
    });
    return new RequestOptions({ headers: headers });
  }
}
