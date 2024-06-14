import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DimensionLeaderBoardComponent } from './dimension-leader-board.component';
import SpyObj = jasmine.SpyObj;
import {LeaderBoardService} from "../../services/LeaderBoardService";
import {LeaderBoardD} from "../../dtos/leaderBoardD";
import {graphService} from "../../services/graphService";
import {Observable, of} from "rxjs";
import {LeaderBoardS} from "../../dtos/leaderBoardS";

describe('DimensionLeaderBoardComponent', () => {
  let component: DimensionLeaderBoardComponent;
  let fixture: ComponentFixture<DimensionLeaderBoardComponent>;
  let fakeLeaderBoardService: SpyObj<LeaderBoardService>;
  let leaderBoardMock: LeaderBoardD[] = [];
  leaderBoardMock.push({name: 'userUM', dimension: 13} as LeaderBoardD);
  leaderBoardMock.push({name: 'userDOIS', dimension: 10} as LeaderBoardD);
  beforeEach(async () => {
    // @ts-ignore
    fakeLeaderBoardService = jasmine.createSpyObj<LeaderBoardService>('LeaderBoardService', {
      getDimensionLeaderBoard: of(leaderBoardMock)
    });
    await TestBed.configureTestingModule({
      declarations: [ DimensionLeaderBoardComponent ],
    providers:[
      {provide: LeaderBoardService, useValue: fakeLeaderBoardService}
    ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DimensionLeaderBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });

  it('should get dimension leader board', () => {
    component.update();
    // @ts-ignore
   // expect(of(leaderBoardMock)).toEqual(component.leaderBoard);
  });
});
