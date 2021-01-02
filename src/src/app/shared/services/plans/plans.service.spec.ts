import { inject, TestBed } from '@angular/core/testing';

import { planService } from './plans.service';

describe('planService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [planService]
    });
  });

  it('should be created', inject([planService], (service: planService) => {
    expect(service).toBeTruthy();
  }));
});
