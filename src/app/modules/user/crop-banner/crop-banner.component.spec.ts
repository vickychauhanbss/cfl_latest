import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropbannerComponent } from './crop-banner.component';

describe('CropbannerComponent', () => {
  let component: CropbannerComponent;
  let fixture: ComponentFixture<CropbannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropbannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropbannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
