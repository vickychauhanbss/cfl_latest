import { inject, TestBed } from '@angular/core/testing';

import { dashboardService } from './dashboard.service';

describe('dashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [dashboardService]
    });
  });

  it('should be created', inject([dashboardService], (service: dashboardService) => {
    expect(service).toBeTruthy();
  }));
});
