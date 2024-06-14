import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {FriendshipService} from "../../services/FriendshipService";

@Component({
  selector: 'app-consultRelationStrengthBetweenUsers',
  templateUrl: './consultRelationStrengthBetweenUsers.component.html',
  styleUrls: [ './consultRelationStrengthBetweenUsers.component.css' ]
})


export class consultRelationStrengthBetweenUsersComponent implements OnInit {
    relationStrength : string | undefined;

  constructor(private route: ActivatedRoute,
              private friendshipService: FriendshipService,
              private location: Location) {}

  ngOnInit(): void {

    }


  getRelationStrengthBetweenUsersComponent(name:string): void {
    let id = localStorage.getItem('id');
    if (!id) return;
    id = id.slice(1,length-1);

    this.friendshipService.getRelationshipStrengthBetweenUsers(name,id)
      .subscribe(relationStrength => this.relationStrength = relationStrength);
  }

  goBack(): void {
    this.location.back();
  }

}
