import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MorepreferencesComponent } from './morepreferences.component';

describe('MorepreferencesComponent', () => {
  let component: MorepreferencesComponent;
  let fixture: ComponentFixture<MorepreferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorepreferencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorepreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
