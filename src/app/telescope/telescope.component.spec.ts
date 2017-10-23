import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelescopeComponent } from './telescope.component';

describe('TelescopeComponent', () => {
  let component: TelescopeComponent;
  let fixture: ComponentFixture<TelescopeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelescopeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelescopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
