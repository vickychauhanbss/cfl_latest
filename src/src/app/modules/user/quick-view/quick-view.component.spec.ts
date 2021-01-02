import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QucikviewComponent } from './quick-view.component';

describe('QucikviewComponent', () => {
  let component: QucikviewComponent;
  let fixture: ComponentFixture<QucikviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QucikviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QucikviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
