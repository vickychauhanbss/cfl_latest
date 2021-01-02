import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartnowModal } from './start-now.component';

describe('StartnowModal', () => {
  let component: StartnowModal;
  let fixture: ComponentFixture<StartnowModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartnowModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartnowModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
