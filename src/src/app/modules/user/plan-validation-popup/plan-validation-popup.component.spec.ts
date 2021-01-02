import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanValidationPopup } from './plan-validation-popup.component';

describe('PlanValidationPopup', () => {
  let component: PlanValidationPopup;
  let fixture: ComponentFixture<PlanValidationPopup>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanValidationPopup ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanValidationPopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
