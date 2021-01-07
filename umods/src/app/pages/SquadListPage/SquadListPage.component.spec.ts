import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadContainerComponent } from './Components/squad-container/squad-container.component';

import { SquadListPageComponent } from './SquadListPage.component';

describe('SquadListPageComponent', () => {
  let component: SquadListPageComponent;
  let fixture: ComponentFixture<SquadListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquadListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SquadListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
