import { Component, OnInit } from '@angular/core';
import { ObservationService } from '../services/observation.service';
import { Observation } from '../models/observation';
import { DatePipe } from '@angular/common';
import { Params, ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-addeditobservations',
  templateUrl: './addeditobservations.component.html',
  styleUrls: ['./addeditobservations.component.css']
})
export class AddeditobservationsComponent implements OnInit {
  getErrorMessage: any = null;
  observation: Observation = new Observation();
  someDate: Date = new Date();
  observationId: number = -1;
  editObservation = false;

  constructor(
    private observationService: ObservationService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.observationId = Number.parseInt(params['id']);
    });
    if (this.observationId > 0) {
      // Editing an observation
      this.editObservation = true;
      this.observationService.getObservation(this.observationId).subscribe(
        result => {
          this.getErrorMessage = null;
          this.observation = result.json();
          const e = this.observation.date.split('/');
          this.someDate = new Date(e[2] + '/' + e[1] + '/' + e[0]);
        },
        err => {
          // this.getErrorMessage = err._body;
          console.log(err);
          this.router.navigate(['/observations']);
        }
      );
    } else {
      this.observationId = -1;
    }
  }

  onSubmit() {
    this.observation.date = this.datePipe.transform(this.someDate, 'dd/MM/yy');
    this.observationService.sendObservation(this.observation).subscribe(
      res => {
        this.router.navigate(['/observations']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
