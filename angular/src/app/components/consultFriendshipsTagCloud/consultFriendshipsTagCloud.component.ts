import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { FriendshipService } from '../../services/FriendshipService';
import {ActivatedRoute} from "@angular/router";
import {TagCloud} from "../../dtos/tagCloud";

@Component({
  selector: 'app-consultFriendshipsTagCloud',
  templateUrl: './consultFriendshipsTagCloud.component.html',
  styleUrls: [ './consultFriendshipsTagCloud.component.css' ]
})

export class ConsultFriendshipsTagCloudComponent implements OnInit {
  tagClouds: TagCloud[] = [];

  constructor(private route: ActivatedRoute,
              private friendshipService: FriendshipService,
              private location: Location) {}

  ngOnInit(): void {
    this.getTagCloudFromFriendships();
  }

  getTagCloudFromFriendships(): void {
    this.friendshipService.getTagCloudFromFriendships()
      .subscribe(t => this.tagClouds = t);
  }

  goBack(): void {
    this.location.back();
  }

}
