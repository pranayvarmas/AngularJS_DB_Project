import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Analytics4Component } from './analytics4.component';

describe('Analytics4Component', () => {
  let component: Analytics4Component;
  let fixture: ComponentFixture<Analytics4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Analytics4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Analytics4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
