import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import {SugestedFriendsService} from "../../services/SugestedFriendsService";
import {User} from "../../dtos/user";
import {Location} from "@angular/common";

@Component({
  selector: 'app-SugestedFriendships',
  templateUrl: './sugestedFriendships.component.html',
  styleUrls: [ './sugestedFriendships.component.css' ]
})
export class SugestedFriendshipsComponent implements OnInit {
  users: User[] = [];
  user: User | undefined;
  message: string | undefined;
  succcess = 'Friends sugested!';
  error = 'Was not possible to suggest friends!';

  constructor(
    private route: ActivatedRoute,
    private sugestedFriendsService: SugestedFriendsService,
    private location:Location
  ) {}

  ngOnInit(): void {
    this.sugestedFriendships();
  }

  sugestedFriendships():void {
    let id = localStorage.getItem('id');
    if (!id) return;
    id = id.slice(1, length - 1);

    this.sugestedFriendsService.sugestedUsers(id).subscribe(user => this.users = user);
    if(!this.users){
      this.message=this.error;
      alert(this.message);
    } else {
      this.message=this.succcess;
    }

  }

  goBack(): void {
    this.location.back();
  }

}
