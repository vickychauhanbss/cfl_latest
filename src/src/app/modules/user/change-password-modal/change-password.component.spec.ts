import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePassword } from './change-password.component';

describe('ChangePassword', () => {
  let component: ChangePassword;
  let fixture: ComponentFixture<ChangePassword>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePassword ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePassword);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
