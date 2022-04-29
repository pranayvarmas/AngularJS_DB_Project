import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCouponsComponent } from './show-coupons.component';

describe('ShowCouponsComponent', () => {
  let component: ShowCouponsComponent;
  let fixture: ComponentFixture<ShowCouponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCouponsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
