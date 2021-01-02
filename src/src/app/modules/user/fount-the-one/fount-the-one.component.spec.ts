import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundTheOneComponent } from './fount-the-one.component';

describe('FoundTheOneComponent', () => {
  let component: FoundTheOneComponent;
  let fixture: ComponentFixture<FoundTheOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoundTheOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundTheOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
