import { Component, OnInit } from '@angular/core';
import { AstrodataService } from '../services/astrodata.service';

@Component({
  selector: 'app-astrodata',
  templateUrl: './astrodata.component.html',
  styleUrls: ['./astrodata.component.css']
})
export class AstrodataComponent implements OnInit {

  astroObjectName;
  submitedAstroObjectName;

  constructor(
    private astrodataService: AstrodataService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitedAstroObjectName = this.astroObjectName;
    this.astrodataService.newSearch(this.astroObjectName);
  }

  search( astroObjectName ) {
    this.submitedAstroObjectName = astroObjectName;
    this.astrodataService.newSearch(astroObjectName);
  }
}
