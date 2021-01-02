import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardignModalComponent } from './onboarding-modal.component';

describe('OnboardignModalComponent', () => {
  let component: OnboardignModalComponent;
  let fixture: ComponentFixture<OnboardignModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardignModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardignModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
