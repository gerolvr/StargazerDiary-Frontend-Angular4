import { Component, OnInit } from '@angular/core';
import { LoginService} from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn = false;
  userName = 'Guest';

  constructor(
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.loginService.getUserNameUpdate().subscribe(message => { this.userName = message; });
    this.loginService.getLoggedInStatusUpdate().subscribe(message => { this.loggedIn = message; });
    this.loginService.checkSession().subscribe(
      res => {
        this.loginService.onLoginSuccess();
        this.loggedIn = true;
        this.userName = this.loginService.getCurrentUsername();
      },
      error => {
        console.log('CheckSession failed');
        console.log(error);
      }
    );
  }

  logout() {
    this.loginService.logout().subscribe(
      res => {
        this.loginService.onLogoutSuccess();
        this.router.navigate(['/']);
      },
      error => {
        console.log(error);
      }
    );
  }
}
