import { inject, TestBed } from '@angular/core/testing';

import { onboardingService } from './onboarding.service';

describe('onboardingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [onboardingService]
    });
  });

  it('should be created', inject([onboardingService], (service: onboardingService) => {
    expect(service).toBeTruthy();
  }));
});
