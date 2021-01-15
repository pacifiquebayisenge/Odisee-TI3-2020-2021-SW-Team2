import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadContainerComponent } from './squad-container.component';

describe('SquadContainerComponent', () => {
  let component: SquadContainerComponent;
  let fixture: ComponentFixture<SquadContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquadContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SquadContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
