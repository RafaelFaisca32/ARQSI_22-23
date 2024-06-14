import {Component, NgModule, OnInit, ViewChild} from '@angular/core';
import {LeaderBoardD} from "../../dtos/leaderBoardD";
import {LeaderBoardService} from "../../services/LeaderBoardService";
import {Location} from "@angular/common";

@Component({
  selector: 'app-dimension-leader-board',
  templateUrl: './dimension-leader-board.component.html',
  styleUrls: ['./dimension-leader-board.component.css']
})
export class DimensionLeaderBoardComponent implements OnInit {
  leaderBoard: LeaderBoardD[] = [];

  constructor(private leaderBoardService: LeaderBoardService, private location: Location) {
  }

  ngOnInit(): void {
    this.update();
  }

  update(): void {
    this.leaderBoard = this.leaderBoardService.getDimensionLeaderBoard();
    if(this.leaderBoard) alert('Dimension Leader Board Updated');
    else alert('Was not possible to update Dimension Leader Board');
  }

  goBack(): void {
    this.location.back();
  }

}




