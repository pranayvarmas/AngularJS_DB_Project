import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonsComponent } from './add-persons.component';

describe('AddPersonsComponent', () => {
  let component: AddPersonsComponent;
  let fixture: ComponentFixture<AddPersonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPersonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
