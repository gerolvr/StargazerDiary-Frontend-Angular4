import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loggedIn;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loggedIn = this.loginService.isCurrentlyLoggedIn();
    this.loginService.getLoggedInStatusUpdate().subscribe(
      message => {
        this.loggedIn = message;
      }
    );
  }

  logout() {
    this.loginService.logout().subscribe(
      res => {
        this.loginService.onLogoutSuccess();
      },
      error => {
        console.log(error);
      }
    );
  }

}
