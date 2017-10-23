import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditobservationsComponent } from './addeditobservations.component';

describe('AddeditobservationsComponent', () => {
  let component: AddeditobservationsComponent;
  let fixture: ComponentFixture<AddeditobservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditobservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditobservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
