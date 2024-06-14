import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {LoginUserService} from "./services/loginUserService";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginUserService: LoginUserService, private router: Router) {
  }

  canActivate(): boolean {
    if (this.loginUserService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/loginUser']);
      return false;
    }
  }

}
