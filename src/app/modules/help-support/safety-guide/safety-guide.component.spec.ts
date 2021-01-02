import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyGuideComponent } from './safety-guide.component';

describe('SafetyGuideComponent', () => {
  let component: SafetyGuideComponent;
  let fixture: ComponentFixture<SafetyGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafetyGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafetyGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
