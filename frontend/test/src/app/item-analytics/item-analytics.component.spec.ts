import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAnalyticsComponent } from './item-analytics.component';

describe('ItemAnalyticsComponent', () => {
  let component: ItemAnalyticsComponent;
  let fixture: ComponentFixture<ItemAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
