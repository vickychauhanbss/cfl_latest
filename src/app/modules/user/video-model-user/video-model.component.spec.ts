import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { videoUserComponent } from './video-model.component';

describe('videoUserComponent', () => {
  let component: videoUserComponent;
  let fixture: ComponentFixture<videoUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ videoUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(videoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
