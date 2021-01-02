import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletetopicsComponent } from './completetopics.component';

describe('CompletetopicsComponent', () => {
  let component: CompletetopicsComponent;
  let fixture: ComponentFixture<CompletetopicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletetopicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletetopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
