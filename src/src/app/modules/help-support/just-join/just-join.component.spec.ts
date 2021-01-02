import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JustJoinComponent } from './just-join.component';

describe('JustJoinComponent', () => {
  let component: JustJoinComponent;
  let fixture: ComponentFixture<JustJoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JustJoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JustJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
