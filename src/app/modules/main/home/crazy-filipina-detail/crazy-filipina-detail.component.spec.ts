import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrazyFilipDetailsComponent } from './crazy-filipina-detail.component';

describe('CrazyFilipDetailsComponent', () => {
  let component: CrazyFilipDetailsComponent;
  let fixture: ComponentFixture<CrazyFilipDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrazyFilipDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrazyFilipDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
