import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LoginService } from './services/login.service';
import { TelescopeService } from './services/telescope.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TelescopeComponent } from './telescope/telescope.component';
import { AddedittelescopeComponent } from './addedittelescope/addedittelescope.component';

const routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'telescopes', component: TelescopeComponent},
  { path: 'addTelescope', component: AddedittelescopeComponent},
  { path: 'editTelescope/:id', component: AddedittelescopeComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    TelescopeComponent,
    AddedittelescopeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    LoginService,
    TelescopeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
