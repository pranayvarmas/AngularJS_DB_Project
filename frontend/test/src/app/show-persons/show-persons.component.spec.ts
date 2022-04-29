import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPersonsComponent } from './show-persons.component';

describe('ShowPersonsComponent', () => {
  let component: ShowPersonsComponent;
  let fixture: ComponentFixture<ShowPersonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPersonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
