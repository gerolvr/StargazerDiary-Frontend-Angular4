import { Component, OnInit } from '@angular/core';
import { ObservationService } from '../services/observation.service';
import { Observation } from '../models/observation';
import { Params, Router } from '@angular/router';

@Component({
  selector: 'app-observations',
  templateUrl: './observations.component.html',
  styleUrls: ['./observations.component.css']
})
export class ObservationsComponent implements OnInit {

  observations: Observation[] = [];

  constructor(
    private observationService: ObservationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getObservations();
  }

  getObservations() {
    this.observationService.getObservations().subscribe(observations => {
      this.observations = observations;
     });
  }

  onSelectEdit(observation: Observation) {
      this.router.navigate(['/editObservation', observation.id]);
  }

  onSelectDelete(observation: Observation) {
    this.observationService.deleteObservation(observation.id).subscribe(
      res => {
        this.observations.splice(this.observations.indexOf(observation), 1);
      },
      err => {
        console.log(err);
      }
    );
  }

}
