import {Component, OnInit} from '@angular/core';
import {LeaderBoardService} from "../../services/LeaderBoardService";
import {Location} from "@angular/common";
import {LeaderBoardS} from "../../dtos/leaderBoardS";

@Component({
  selector: 'app-strength-leader-board',
  templateUrl: './strength-leader-board.component.html',
  styleUrls: ['./strength-leader-board.component.css']
})
export class StrengthLeaderBoardComponent implements OnInit {
  leaderBoard: LeaderBoardS[] = [];

  constructor(private leaderBoardService: LeaderBoardService, private location: Location) {
  }

  ngOnInit(): void {
    this.update();
  }

  update(): void {
    this.leaderBoard = this.leaderBoardService.getStrengthLeaderBoard();
    if(this.leaderBoard) alert('Strength Leader Board Updated');
    else alert('Was not possible to update Strength Leader Board');
  }

  goBack(): void {
    this.location.back();
  }

}
