import { TestBed, inject } from '@angular/core/testing';

import { AstrodataService } from './astrodata.service';

describe('AstrodataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AstrodataService]
    });
  });

  it('should be created', inject([AstrodataService], (service: AstrodataService) => {
    expect(service).toBeTruthy();
  }));
});
