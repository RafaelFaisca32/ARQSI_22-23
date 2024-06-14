import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {IntroductionService} from "../../services/IntroductionService";
import {Introduction} from "../../dtos/introduction";
import {IntroductionNames} from "../../dtos/introductionNames";

@Component({
  selector: 'app-changeIntroductionState',
  templateUrl: './changeIntroductionState.component.html',
  styleUrls: [ './changeIntroductionState.component.css' ]
})
export class ChangeIntroductionStateComponent implements OnInit {
  introduction: Introduction |undefined;
  introductions: IntroductionNames[] = [];
  message: string |undefined;

  constructor(
    private route: ActivatedRoute,
    private introductionService : IntroductionService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPendingIntroductions();
  }

  acceptFriendshipRequest(introductionId: string): void {
    this.introductionService.acceptIntroductionRequest(introductionId).subscribe(i => {
      this.introduction = i;
    });
  }

  rejectFriendshipRequest(introductionId: string): void {
    this.introductionService.rejectIntroductionRequest(introductionId).subscribe(i => {
      this.introduction = i;
    });
  }

  getPendingIntroductions(): void{
    let id = localStorage.getItem('id');
    if (!id) return;
    id = id.slice(1,length-1);

    this.introductionService.getPendingIntroductionRequestsFromUser(id).subscribe(list => {
      this.introductions = list;
      if(this.introductions.length==0){
        this.message="No pending introductions";
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

}
