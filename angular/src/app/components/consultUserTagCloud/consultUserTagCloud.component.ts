import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { UserService } from '../../services/UserService';
import {ActivatedRoute} from "@angular/router";
import {TagCloud} from "../../dtos/tagCloud";

@Component({
  selector: 'app-consultUserTagCloud',
  templateUrl: './consultUserTagCloud.component.html',
  styleUrls: [ './consultUserTagCloud.component.css' ]
})

export class ConsultUserTagCloudComponent implements OnInit {
  tagClouds: TagCloud[] = [];

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private location: Location) {}

  ngOnInit(): void {
    this.getTagCloudFromUser();
  }

  getTagCloudFromUser(): void {
    let id = localStorage.getItem('id');
    if (!id) return;
    id = id.slice(1,length-1);

    this.userService.getTagCloudFromUser(id)
      .subscribe(t => this.tagClouds = t);
  }

  goBack(): void {
    this.location.back();
  }

}
