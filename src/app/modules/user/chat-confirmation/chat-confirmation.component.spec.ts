import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatConfimationComponent } from './chat-confirmation.component';

describe('ChatConfimationComponent', () => {
  let component: ChatConfimationComponent;
  let fixture: ComponentFixture<ChatConfimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatConfimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatConfimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
