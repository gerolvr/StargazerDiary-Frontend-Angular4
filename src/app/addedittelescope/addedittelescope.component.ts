import { Component, OnInit } from '@angular/core';
import { Telescope } from '../models/telescope';
import { TelescopeService} from '../services/telescope.service';
import { Params, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addedittelescope',
  templateUrl: './addedittelescope.component.html',
  styleUrls: ['./addedittelescope.component.css']
})
export class AddedittelescopeComponent implements OnInit {
getErrorMessage: any = null;
  telescopeId: number = -1;
  telescope: Telescope = new Telescope();

  constructor(
    private telescopeService: TelescopeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.telescopeId = Number.parseInt(params['id']);
    });
    if (this.telescopeId > 0) {
      // Editing a telescope
      // console.log('telescopeId' + this.telescopeId);
      this.telescopeService.getTelescope(this.telescopeId).subscribe(
        res => {
          this.getErrorMessage = null;
          this.telescope = res.json();
        },
        error => {
          this.getErrorMessage = error._body;
          console.log(error._body);
        }
      );
    } else {
      // Creatin a new telescope
      this.telescopeId = -1;
    }
  }

  onSubmit(submittedForm) {
    this.telescopeService.sendTelescope(this.telescope).subscribe(
      res => {
        this.router.navigate(['/telescopes']);
      },
      error => {
        console.log(error);
      }
    );
  }
}
