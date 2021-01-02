import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetakeModalComponent } from './retake-modal.component';

describe('RetakeModalComponent', () => {
  let component: RetakeModalComponent;
  let fixture: ComponentFixture<RetakeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetakeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetakeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
