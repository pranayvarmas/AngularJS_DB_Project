import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DpDetailsComponent } from './dp-details.component';

describe('DpDetailsComponent', () => {
  let component: DpDetailsComponent;
  let fixture: ComponentFixture<DpDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DpDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DpDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
