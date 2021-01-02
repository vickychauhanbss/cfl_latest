import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhilipinesComponent } from './philipines-state.component';

describe('PhilipinesComponent', () => {
  let component: PhilipinesComponent;
  let fixture: ComponentFixture<PhilipinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhilipinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhilipinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
