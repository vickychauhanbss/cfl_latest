import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutcrazyfilipinaloveComponent } from './aboutcrazyfilipinalove.component';

describe('AboutcrazyfilipinaloveComponent', () => {
  let component: AboutcrazyfilipinaloveComponent;
  let fixture: ComponentFixture<AboutcrazyfilipinaloveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutcrazyfilipinaloveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutcrazyfilipinaloveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
