import { Component } from '@angular/core';
import {LoginUserService} from "./services/loginUserService";
import {UserService} from "./services/UserService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  networkLength: number | undefined;

  title = 'Social Network';
  constructor(private userService:UserService) {
    this.userService.networkLength().subscribe(n => this.networkLength = n);
    }
}
