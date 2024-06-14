import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/UserService";
import {User} from "../../dtos/user";
import {Location} from "@angular/common";

@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrls: ['./change-profile.component.css']
})
export class ChangeProfileComponent implements OnInit {

  user1: User|undefined;
  user: User | undefined;
  message: string | undefined;
  succcess = 'Profile changed!';
  error = 'Was not possible to change profile!';


  constructor(private userService: UserService, private location: Location) {
  }

  ngOnInit(): void {
  }

  changeProfile(email: string, phoneNumber: string, password: string, birthDate: string, name: string, tag: string) {
    this.message = undefined;
    name = name.trim();
    password = password.trim();
    birthDate = birthDate.trim();
    email = email.trim();
    phoneNumber = phoneNumber.trim();
    tag = tag.trim();
    var tags = tag.split(',');
    if (!name && !password && !birthDate && !email && !phoneNumber && !tag) return;
    let id = localStorage.getItem('id');
    if (!id) return;
    id = id.slice(1, length - 1);
    this.userService.getUser(id).subscribe(user => {
      this.user = user;
      if (!this.user) return;
      this.user.name = name;
      this.user.email = email;
      this.user.password = password;
      this.user.birthDate = birthDate;
      this.user.phoneNumber = phoneNumber;
      if (!tag) this.user.tag = this.user.tag;
      else this.user.tag = tags;
      this.userService.updateProfile(this.user).subscribe(user1 => {
        this.user1 = user1;
        if (!user1) {
          this.message = this.error;
          alert(this.message);
        } else {
          this.message = this.succcess;
          alert(this.message);
        }
      });
    });


  }


  goBack(): void {
    this.location.back();
  }

}
