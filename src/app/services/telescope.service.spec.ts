import { TestBed, inject } from '@angular/core/testing';

import { TelescopeService } from './telescope.service';

describe('TelescopeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TelescopeService]
    });
  });

  it('should be created', inject([TelescopeService], (service: TelescopeService) => {
    expect(service).toBeTruthy();
  }));
});
