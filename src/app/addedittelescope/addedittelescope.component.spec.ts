import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedittelescopeComponent } from './addedittelescope.component';

describe('AddedittelescopeComponent', () => {
  let component: AddedittelescopeComponent;
  let fixture: ComponentFixture<AddedittelescopeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddedittelescopeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedittelescopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
