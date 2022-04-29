import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOfflineOrdersComponent } from './show-offline-orders.component';

describe('ShowOfflineOrdersComponent', () => {
  let component: ShowOfflineOrdersComponent;
  let fixture: ComponentFixture<ShowOfflineOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowOfflineOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOfflineOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
