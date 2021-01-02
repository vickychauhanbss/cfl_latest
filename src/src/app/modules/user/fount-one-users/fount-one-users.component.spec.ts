import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundConnectComponent } from './fount-one-users.component';

describe('FoundConnectComponent', () => {
  let component: FoundConnectComponent;
  let fixture: ComponentFixture<FoundConnectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoundConnectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
