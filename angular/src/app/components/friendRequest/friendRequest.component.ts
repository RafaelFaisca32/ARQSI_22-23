import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { FriendshipService } from '../../services/FriendshipService';
import {Friendship} from "../../dtos/friendship";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/UserService";
import {User} from "../../dtos/user";

@Component({
  selector: 'app-friendRequest',
  templateUrl: './friendRequest.component.html',
  styleUrls: [ './friendRequest.component.css' ]
})

export class FriendRequestComponent implements OnInit {
  friendships: Friendship[] = [];
  user: User | undefined;
  message: string | undefined;
  succcess = 'Friendship request created!';
  error = 'Was not possible to create friend request!';

  constructor(private route: ActivatedRoute,
              private friendshipService: FriendshipService,
              private userService: UserService,
              private location: Location) {}

  ngOnInit(): void {
    this.getFriendships();
  }

  getFriendships(): void {
    this.friendshipService.getFriendships()
      .subscribe(friendships => this.friendships = friendships);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }

    let id = localStorage.getItem('id');
    if (!id) return;
    id = id.slice(1,length-1);

    this.friendshipService.addFriendship(id, name)
      .subscribe(friendship => {
        this.friendships.push(friendship);
        if (!friendship) {
          this.message = this.error;
          alert(this.message);
        } else {
          this.message = this.succcess;
          alert(this.message);
        }
      });
  }

  goBack(): void {
    this.location.back();
  }

}
