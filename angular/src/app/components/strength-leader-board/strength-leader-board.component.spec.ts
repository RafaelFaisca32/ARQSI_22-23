import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrengthLeaderBoardComponent } from './strength-leader-board.component';

describe('StrengthLeaderBoardComponent', () => {
  let component: StrengthLeaderBoardComponent;
  let fixture: ComponentFixture<StrengthLeaderBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrengthLeaderBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StrengthLeaderBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    //expect(component).toBeTruthy();
  });
});
