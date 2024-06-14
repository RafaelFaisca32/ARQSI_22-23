import {Component,OnInit} from "@angular/core";
import {Location} from '@angular/common';


import {ActivatedRoute} from "@angular/router";

import {UserService} from "../../services/UserService";
import {TagCloud} from "../../dtos/tagCloud";



@Component({
  selector: 'app-consultUsersTagCloud',
  templateUrl: './consultUsersTagCloud.component.html',
  styleUrls: [ './consultUsersTagCloud.component.css' ]
})

export class consultUsersTagCloudComponent implements OnInit {
  tagClouds: TagCloud[] = [];

  constructor(private route: ActivatedRoute,
              private _userService: UserService,
              private location: Location) {}

  ngOnInit(): void {
    this.getTagCloudFromUsers();
  }

  getTagCloudFromUsers(): void {
    this._userService.getTagCloudFromUsers()
      .subscribe(t => this.tagClouds = t);
  }

  goBack(): void {
    this.location.back();
  }
  }
