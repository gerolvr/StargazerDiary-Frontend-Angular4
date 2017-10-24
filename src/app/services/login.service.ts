import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../environments/environment';

@Injectable()
export class LoginService {
  private url = environment.host + '/api/v1/';
  private userChangedSubject = new Subject<string>();
  private isLoggedInSubject = new Subject<boolean>();

  constructor(private http: Http) { }

  sendIdentifiers(username: string, password: string) {
    const encodedCredentials = btoa(username + ':' + password);
    const basicHeader = 'Basic ' + encodedCredentials;
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': basicHeader
    });
    return this.http.get(this.url + 'user/getToken', { headers: headers });

  }

  checkSession() {
    const headers = new Headers({
      'x-auth-token': localStorage.getItem('SGD_xAuthToken') ? localStorage.getItem('SGD_xAuthToken') : ''
    });

    return this.http.get(this.url + 'user/checkSession', { headers: headers });
  }

  logout() {
    console.log('logging out');
    const headers = new Headers({
      'x-auth-token': localStorage.getItem('SGD_xAuthToken')
    });

    return this.http.post(this.url + 'user/logout', '', { headers: headers });
  }

  isCurrentlyLoggedIn() {
    return (localStorage.getItem('SGD_xAuthToken') != null) && (localStorage.getItem('SGD_username') != null);
  }

  getCurrentUsername() {
    return localStorage.getItem('SGD_username') ? localStorage.getItem('SGD_username') : 'Guest';
  }

  onLoginSuccess() {
    this.userChangedSubject.next(localStorage.getItem('SGD_username'));
    this.isLoggedInSubject.next(true);
  }

  onLogoutSuccess() {
    localStorage.removeItem('SGD_xAuthToken');
    localStorage.removeItem('SGD_username');
    this.userChangedSubject.next('Guest');
    this.isLoggedInSubject.next(false);
  }

  getUserNameUpdate(): Observable<any> {
    return this.userChangedSubject.asObservable();
  }

  getLoggedInStatusUpdate(): Observable<any> {
    return this.isLoggedInSubject.asObservable();
  }
}
