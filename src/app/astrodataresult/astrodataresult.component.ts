import { Component, OnInit, Input } from '@angular/core';
import { AstrodataService } from '../services/astrodata.service';
import { AstroDataSearchResult } from '../models/astroDataSearchResult';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-astrodataresult',
  templateUrl: './astrodataresult.component.html',
  styleUrls: ['./astrodataresult.component.css']
})
export class AstrodataresultComponent implements OnInit {
  @Input() search: string;
  astroDataSearchResult: AstroDataSearchResult;
  sanitizedPlanetariumUrl: SafeResourceUrl;
  sanitizedWhiskySkyUrl: SafeResourceUrl;
  searchComplete = false;
  searchCompletedSuccessfully = false;
  astroObjectNotFound = false;

  constructor(
    private astrodataService: AstrodataService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.astrodataService.getNewSearchStarted().subscribe(
      resp => {
        this.searchComplete = false;
        this.searchCompletedSuccessfully = false;
        this.astroObjectNotFound = false;
        this.astroDataSearchResult = null;
      }
    );
    this.astrodataService.getSearchResult().subscribe(
      astroDataSearchResult => {
        if (!astroDataSearchResult.found) {
          this.astroDataSearchResult = null;
          this.astroObjectNotFound = true;
          this.searchComplete = true;
          this.searchCompletedSuccessfully = false;
        } else {
          this.sanitizedPlanetariumUrl = this.sanitizer.bypassSecurityTrustResourceUrl(astroDataSearchResult.planetariumUrl);
          this.sanitizedWhiskySkyUrl = this.sanitizer.bypassSecurityTrustResourceUrl(astroDataSearchResult.wiskySkyUrl);
          this.searchComplete = true;
          this.searchCompletedSuccessfully = true;
          this.astroObjectNotFound = false;
          this.astroDataSearchResult = astroDataSearchResult;
        }
      },
      err => {
        console.log(err);
        this.astroObjectNotFound = true;
        this.searchComplete = false;
      }
    );
  }

}
