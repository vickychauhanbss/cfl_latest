import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiePolicyeComponent } from './Cookie-Policy.component';

describe('CookiePolicyeComponent', () => {
  let component: CookiePolicyeComponent;
  let fixture: ComponentFixture<CookiePolicyeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookiePolicyeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookiePolicyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
