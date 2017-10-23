import { Component, OnInit } from '@angular/core';
import { TelescopeService } from '../services/telescope.service';
import { Telescope } from '../models/telescope';
import { Params, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-telescope',
  templateUrl: './telescope.component.html',
  styleUrls: ['./telescope.component.css']
})
export class TelescopeComponent implements OnInit {

  telescopes: Telescope[] = [];

  constructor(
    private telescopeService: TelescopeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getTelescopes();
  }

  getTelescopes() {
    this.telescopeService.getTelescopes().subscribe(telescopes => {
      this.telescopes = telescopes;
     });
  }

  onSelectEdit(telescope: Telescope) {
      this.router.navigate(['/editTelescope', telescope.id]);
  }

  onSelectDelete(telescope: Telescope) {
    this.telescopeService.deleteTelescope(telescope.id).subscribe(
      res => {
        this.telescopes.splice(this.telescopes.indexOf(telescope), 1);
      },
      err => {
        console.log(err);
      }
    );
  }
}
