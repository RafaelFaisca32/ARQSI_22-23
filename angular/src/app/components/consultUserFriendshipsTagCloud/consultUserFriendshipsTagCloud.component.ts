import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { FriendshipService } from '../../services/FriendshipService';
import {ActivatedRoute} from "@angular/router";
import {TagCloud} from "../../dtos/tagCloud";

@Component({
  selector: 'app-consultUserFriendshipsTagCloud',
  templateUrl: './consultUserFriendshipsTagCloud.component.html',
  styleUrls: [ './consultUserFriendshipsTagCloud.component.css' ]
})

export class ConsultUserFriendshipsTagCloudComponent implements OnInit {
  tagClouds: TagCloud[] = [];

  constructor(private route: ActivatedRoute,
              private friendshipService: FriendshipService,
              private location: Location) {}

  ngOnInit(): void {
    this.getTagCloudFromUserFriendships();
  }

  getTagCloudFromUserFriendships(): void {
    let id = localStorage.getItem('id');
    if (!id) return;
    id = id.slice(1,length-1);

    this.friendshipService.getTagCloudFromUserFriendships(id)
      .subscribe(t => this.tagClouds = t);
  }

  goBack(): void {
    this.location.back();
  }

}
