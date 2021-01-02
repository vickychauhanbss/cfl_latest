import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadvideoprogressComponent } from './uploadvideoprogress.component';

describe('UploadvideoprogressComponent', () => {
  let component: UploadvideoprogressComponent;
  let fixture: ComponentFixture<UploadvideoprogressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadvideoprogressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadvideoprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
