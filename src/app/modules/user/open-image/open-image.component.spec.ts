import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenImageComponent } from './open-image.component';

describe('OpenImageComponent', () => {
  let component: OpenImageComponent;
  let fixture: ComponentFixture<OpenImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
