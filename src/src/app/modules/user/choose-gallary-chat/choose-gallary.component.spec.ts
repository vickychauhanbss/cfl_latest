import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseGallaryComponent } from './choose-gallary.component';

describe('ChooseGallaryComponent', () => {
  let component: ChooseGallaryComponent;
  let fixture: ComponentFixture<ChooseGallaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseGallaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseGallaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
