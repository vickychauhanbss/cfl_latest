import { inject, TestBed } from '@angular/core/testing';

import { loginRegisterService } from "./login-register.service";

describe('loginRegisterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [loginRegisterService]
    });
  });

  it('should be created', inject([loginRegisterService], (service: loginRegisterService) => {
    expect(service).toBeTruthy();
  }));
});
