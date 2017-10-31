import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationSuccessMessage;
  registrationFailedMessage;
  identifiers = {'name' : '', 'password': ''};

  constructor(
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {

    if(this.loginService.isCurrentlyLoggedIn()){
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    this.loginService.sendRegistrationIdentifiers(this.identifiers)
      .subscribe(resp => {
        this.registrationFailedMessage = null;
        this.onRegistrationSuccess();
      },
      error => {
        this.registrationSuccessMessage = null;
        this.registrationFailedMessage = error.text();
      });
  }

  private onRegistrationSuccess() {
    this.loginService.sendIdentifiers(
      this.identifiers.name, this.identifiers.password)
      .subscribe(loginresp => {
        localStorage.setItem('SGD_xAuthToken', loginresp.json().token);
        localStorage.setItem('SGD_username', this.identifiers.name);
        this.loginService.onLoginSuccess();
        this.registrationSuccessMessage = 'Thanks for registering. Your are now logged in.';
      },
      loginerr => {
        console.log(loginerr);
        this.registrationSuccessMessage = null;
        this.registrationFailedMessage = loginerr.text();
      });
  }
}
