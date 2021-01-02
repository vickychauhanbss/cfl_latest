import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { coverBannerComponent } from './cover-banner-modal.component';

describe('coverBannerComponent', () => {
  let component: coverBannerComponent;
  let fixture: ComponentFixture<coverBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ coverBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(coverBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
