import { inject, TestBed } from '@angular/core/testing';

import { loginService } from "./login.service";

describe('loginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [loginService]
    });
  });

  it('should be created', inject([loginService], (service: loginService) => {
    expect(service).toBeTruthy();
  }));
});
