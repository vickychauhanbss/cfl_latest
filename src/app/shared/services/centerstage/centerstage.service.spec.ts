import { inject, TestBed } from '@angular/core/testing';

import { centerStageService } from './centerstage.service';

describe('centerStageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [centerStageService]
    });
  });

  it('should be created', inject([centerStageService], (service: centerStageService) => {
    expect(service).toBeTruthy();
  }));
});
