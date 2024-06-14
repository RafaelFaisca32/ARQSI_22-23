import {Component, Input, OnInit} from '@angular/core';
import { Router} from "@angular/router";
import { LoginUserService } from '../../services/loginUserService'
import {loginDTO} from "../../dtos/loginDTO";

@Component({
  selector: 'app-login',
  templateUrl: './loginUser.component.html',
  styleUrls: ['./loginUser.component.css']
})
export class loginUserComponent implements OnInit {

  constructor(private router: Router, private loginUserService:LoginUserService) {
    this.result='';
  }

  result: string;

  ngOnInit(): void {

    if (this.loginUserService.isLoggedIn()) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  onSubmit(email: string, password: string): void {
    email.trim();
    password.trim();
    if (!email) { return; }
    if (!password) { return; }
    this.loginUserService.login({email: email,password: password} as loginDTO).subscribe(answer => {
        this.router.navigateByUrl('/dashboard');
        localStorage.setItem('email', JSON.stringify(email));
        localStorage.setItem('id',JSON.stringify(answer.id));
      },
      (error => {
        this.result = 'Account not found';
        alert(this.result);
      }
    ));
  }


  login(){
    this.router.navigateByUrl('/loginUser');
  }

  register(){
    this.router.navigateByUrl('/registerUser');
  }
}
