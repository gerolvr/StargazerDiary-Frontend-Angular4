import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstrodataresultComponent } from './astrodataresult.component';

describe('AstrodataresultComponent', () => {
  let component: AstrodataresultComponent;
  let fixture: ComponentFixture<AstrodataresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AstrodataresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AstrodataresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
