import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CusImageComponent } from './cus-image.component';

describe('CusImageComponent', () => {
  let component: CusImageComponent;
  let fixture: ComponentFixture<CusImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CusImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CusImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
