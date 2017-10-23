import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoginService {

  private userChangedSubject = new Subject<string>();
  private isLoggedInSubject = new Subject<boolean>();

  constructor(private http: Http) { }

  sendIdentifiers(username: string, password: string) {
    const url = 'http://localhost:8080/api/v1/user/getToken';
    const encodedCredentials = btoa(username + ':' + password);
    const basicHeader = 'Basic ' + encodedCredentials;
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': basicHeader
    });
    return this.http.get(url, { headers: headers });

  }

  checkSession() {
    const url = 'http://localhost:8080/api/v1/user/checkSession';
    const headers = new Headers({
      'x-auth-token': localStorage.getItem('SGD_xAuthToken') ? localStorage.getItem('SGD_xAuthToken') : ''
    });

    console.log(localStorage.getItem('SGD_xAuthToken'));
    console.log('URL: ' + url);
    return this.http.get(url, { headers: headers });
  }

  logout() {
    const url = 'http://localhost:8080/api/v1/user/logout';
    console.log('logging out');
    const headers = new Headers({
      'x-auth-token': localStorage.getItem('SGD_xAuthToken')
    });

    return this.http.post(url, '', { headers: headers });
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
