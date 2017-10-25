import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatGridListModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { LoginService } from './services/login.service';
import { TelescopeService } from './services/telescope.service';
import { ObservationService } from './services/observation.service';
import { AstrodataService } from './services/astrodata.service';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TelescopeComponent } from './telescope/telescope.component';
import { AddedittelescopeComponent } from './addedittelescope/addedittelescope.component';
import { ObservationsComponent } from './observations/observations.component';
import { AddeditobservationsComponent } from './addeditobservations/addeditobservations.component';
import { AstrodataComponent } from './astrodata/astrodata.component';
import { AstrodataresultComponent } from './astrodataresult/astrodataresult.component';

import { AuthGuardService } from './services/authguard.service';
import { RegistrationComponent } from './registration/registration.component';

const routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'telescopes', component: TelescopeComponent, canActivate: [AuthGuardService] },
  { path: 'addTelescope', component: AddedittelescopeComponent, canActivate: [AuthGuardService] },
  { path: 'editTelescope/:id', component: AddedittelescopeComponent, canActivate: [AuthGuardService] },
  { path: 'observations', component: ObservationsComponent, canActivate: [AuthGuardService] },
  { path: 'addObservation', component: AddeditobservationsComponent, canActivate: [AuthGuardService] },
  { path: 'editObservation/:id', component: AddeditobservationsComponent, canActivate: [AuthGuardService] },
  { path: 'astrodata', component: AstrodataComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    TelescopeComponent,
    AddedittelescopeComponent,
    ObservationsComponent,
    AddeditobservationsComponent,
    AstrodataComponent,
    AstrodataresultComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NoopAnimationsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    LoginService,
    TelescopeService,
    ObservationService,
    DatePipe,
    AstrodataService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
