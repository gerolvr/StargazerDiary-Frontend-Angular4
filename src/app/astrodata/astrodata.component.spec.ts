import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstrodataComponent } from './astrodata.component';

describe('AstrodataComponent', () => {
  let component: AstrodataComponent;
  let fixture: ComponentFixture<AstrodataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AstrodataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AstrodataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
