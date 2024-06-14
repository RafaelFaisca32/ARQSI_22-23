import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/UserService";
import {User} from "../../dtos/user";
import {Location} from "@angular/common";
import {LoginUserService} from "../../services/loginUserService";

@Component({
  selector: 'app-change-mood',
  templateUrl: './change-mood.component.html',
  styleUrls: ['./change-mood.component.css']
})
export class ChangeMoodComponent implements OnInit {
  user1: User| undefined;
  message: string | undefined;
  succcess = 'Mood changed!';
  error = 'Was not possible to change mood!';

  constructor(private userService: UserService, private location: Location) {
  }

  ngOnInit(): void {
  }

  changeMood(mood: string) {
    this.message=undefined;
    if (!mood) return;
    let id1 = localStorage.getItem('id');
    if (!id1) return;
    this.userService.updateMood(id1.slice(1, length - 1), mood).subscribe(user => {
      this.user1=user;
      if (!user) {
        this.message = this.error;
        alert(this.message);
      }
      else {
        this.message = this.succcess;
        alert(this.message);
      }
    });

  }

  goBack(): void {
    this.location.back();
  }

}
