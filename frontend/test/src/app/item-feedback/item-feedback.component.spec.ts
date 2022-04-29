import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFeedbackComponent } from './item-feedback.component';

describe('ItemFeedbackComponent', () => {
  let component: ItemFeedbackComponent;
  let fixture: ComponentFixture<ItemFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
