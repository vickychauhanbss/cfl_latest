import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { showMessageComponent } from './show-message.component';

describe('showMessageComponent', () => {
  let component: showMessageComponent;
  let fixture: ComponentFixture<showMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ showMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(showMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
