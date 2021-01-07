import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderPageComponent } from './CalenderPage.component';

describe('CalenderPageComponent', () => {
  let component: CalenderPageComponent;
  let fixture: ComponentFixture<CalenderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalenderPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalenderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
