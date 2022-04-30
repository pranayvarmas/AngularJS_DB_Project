import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Analytics3Component } from './analytics3.component';

describe('Analytics3Component', () => {
  let component: Analytics3Component;
  let fixture: ComponentFixture<Analytics3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Analytics3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Analytics3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
