import { Component, OnInit } from '@angular/core';
import {User} from "../../dtos/user";
import {Location} from "@angular/common";
import {UserService} from "../../services/UserService";


@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];
  accepted: boolean | undefined;
  result: string;

  constructor(private location: Location,private userService: UserService) {
    this.result='';
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  add(name: string,
  password: string,
  birthDate: string,
  email: string,
  phoneNumber: string): void {
    if(!this.accepted){alert("You need to accept the policies");return;}
    var tag = ["1"];
    tag.length = 0;
    var friendship = ["1"];
    friendship.length = 0;
    name = name.trim();
    password = password.trim();
    birthDate = birthDate.trim();
    email = email.trim();
    phoneNumber = phoneNumber.trim();
    if (!name) { return; }
    if (!password) { return; }
    if (!birthDate) { return; }
    if (!email) { return; }
    if (!phoneNumber) { return; }
    this.userService.addUser({ name:name,password:password,birthDate:birthDate,email:email,phoneNumber:phoneNumber,state:'Joyful',tag:tag, friendship:friendship} as User)
      .subscribe(user => {
        this.users.push(user);
      },
        (error => {
            this.result = 'Invalid data, please try again';
            alert(this.result);
          }
        ));
  }

  toggleEditable(event: any) {
    if ( event.target.checked ) {
      this.accepted = true;
    }
  }

  login(){
    this.location.back();
  }
}
