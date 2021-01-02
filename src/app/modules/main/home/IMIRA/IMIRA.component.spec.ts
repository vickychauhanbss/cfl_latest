import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IMIRAComponent } from './IMIRA.component';

describe('IMIRAComponent', () => {
  let component: IMIRAComponent;
  let fixture: ComponentFixture<IMIRAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IMIRAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IMIRAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
