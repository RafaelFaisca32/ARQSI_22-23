import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { FriendshipService } from '../../services/FriendshipService';
import { AcceptFriendshipRequestService } from '../../services/AcceptFriendshipRequestService';
import {Friendship} from "../../dtos/friendship";
import {User} from "../../dtos/user";

@Component({
  selector: 'app-listPendingFriendshipRequests',
  templateUrl: './listPendingFriendshipRequests.component.html',
  styleUrls: [ './listPendingFriendshipRequests.component.css' ]
})
export class ListPendingFriendshipRequestsComponent implements OnInit {
  friendships: Friendship[] = [];
  friendship: Friendship|undefined;

  constructor(
    private route: ActivatedRoute,
    private friendshipService: FriendshipService,
    private acceptFriendshipRequestService : AcceptFriendshipRequestService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.listPendingFriendshipRequests();
  }

  listPendingFriendshipRequests(): void {
    let id = localStorage.getItem('id');
    if (!id) return;
    id = id.slice(1,length-1);

    this.friendshipService.listPendingFriendshipRequests(id)
      .subscribe(friendship => this.friendships = friendship);
  }

  acceptFriendshipRequest(friendshipId: string): void {
    this.acceptFriendshipRequestService.acceptFriendshipRequest(friendshipId).subscribe(f => {
      this.friendship = f;
    });
  }

  rejectFriendshipRequest(friendshipId: string): void {
    this.acceptFriendshipRequestService.rejectFriendshipRequest(friendshipId).subscribe(f => {
      this.friendship = f;
    });
  }

  goBack(): void {
    this.location.back();
  }

}
