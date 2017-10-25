import { Component, OnInit } from '@angular/core';
import { LoginService} from '../services/login.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registered;
  registrationSuccessMessage;
  registrationFailedMessage;
  identifiers = {'name' : '', 'password': ''};

  constructor(private loginService: LoginService) { }

  ngOnInit() {
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
        this.registrationFailedMessage = loginerr.text();
      });
  }
}
