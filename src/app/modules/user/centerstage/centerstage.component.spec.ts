import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterstageComponent } from './centerstage.component';

describe('CenterstageComponent', () => {
  let component: CenterstageComponent;
  let fixture: ComponentFixture<CenterstageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterstageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterstageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
