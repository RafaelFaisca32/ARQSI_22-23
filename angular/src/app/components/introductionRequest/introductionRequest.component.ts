import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {IntroductionService} from "../../services/IntroductionService";
import {Introduction} from "../../dtos/introduction";
import {UserService} from "../../services/UserService";
import {Friendship} from "../../dtos/friendship";
import {FriendshipService} from "../../services/FriendshipService";
import {User} from "../../dtos/user";

@Component({
  selector: 'app-introductionRequest',
  templateUrl: './introductionRequest.component.html',
  styleUrls: [ './introductionRequest.component.css' ]
})

export class IntroductionRequestComponent implements OnInit {
  introduction: Introduction | undefined;
  user: User[] = [];
  userFriendships : Friendship[] = [];

  constructor(private route: ActivatedRoute,
              private introdutionService: IntroductionService,
              private userService: UserService,
              private friendshipService: FriendshipService,
              private location: Location) {}

  ngOnInit(): void {
    /*let id = localStorage.getItem('id');
    if (!id) return;
    id = id.slice(1,length-1);

    this.userService.getUser(id).subscribe(user =>{this.user.push(user)});

    for (let index in this.user) {
      this.friendshipService.getFriendshipById(index).subscribe(f => this.userFriendships.push(f));
    }*/
  }

  addIntroduction(commonFriend: string,
      friend: string): void {

    let id = localStorage.getItem('id');
    if (!id) return;
    id = id.slice(1,length-1);

    this.introdutionService.addIntroduction({ requester:id,commonFriend:commonFriend,friend:friend,state:'Pending'} as Introduction)
      .subscribe(introduction => {
        this.introduction = introduction;
      });
  }

  goBack(): void {
    this.location.back();
  }

}
