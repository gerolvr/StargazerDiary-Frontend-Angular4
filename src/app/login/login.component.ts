import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  identifiers = { 'username': '', 'password': '' };
  loggedIn = false;
  authenticationFailed = false;
  returnUrl: string;

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loggedIn = this.loginService.isCurrentlyLoggedIn();
    this.loginService.getLoggedInStatusUpdate().subscribe(message => { this.loggedIn = message; });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.loginService.sendIdentifiers(
      this.identifiers.username, this.identifiers.password)
      .subscribe(resp => {
        localStorage.setItem('SGD_xAuthToken', resp.json().token);
        localStorage.setItem('SGD_username', this.identifiers.username);
        this.authenticationFailed = false;
        this.loginService.onLoginSuccess();
        this.router.navigate([this.returnUrl]);
      },
      err => {
        console.log(err);
        this.authenticationFailed = true;
      });
  }

}
