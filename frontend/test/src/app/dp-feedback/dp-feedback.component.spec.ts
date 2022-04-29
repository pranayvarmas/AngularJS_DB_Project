import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DpFeedbackComponent } from './dp-feedback.component';

describe('DpFeedbackComponent', () => {
  let component: DpFeedbackComponent;
  let fixture: ComponentFixture<DpFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DpFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DpFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
