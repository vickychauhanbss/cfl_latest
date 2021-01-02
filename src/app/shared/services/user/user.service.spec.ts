import { inject, TestBed } from '@angular/core/testing';

import { userService } from './user.service';

describe('userService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [userService]
    });
  });

  it('should be created', inject([userService], (service: userService) => {
    expect(service).toBeTruthy();
  }));
});
