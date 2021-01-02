import { inject, TestBed } from '@angular/core/testing';

import { footerService } from "./footer.service";

describe('ValidationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [footerService]
    });
  });

  it('should be created', inject([footerService], (service: footerService) => {
    expect(service).toBeTruthy();
  }));
});
