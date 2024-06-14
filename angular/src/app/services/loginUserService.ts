import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {loginDTO} from "../dtos/loginDTO";
import {User} from "../dtos/user";

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {

  private loginUrl = 'https://lapr5backend.azurewebsites.net/api/User/login';  // URL to web api

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'answer'
  };


  public login(data: loginDTO): Observable<User> {

    return this.http.post<User>(this.loginUrl, data).pipe(answer => { return answer });

  }

  isLoggedIn() {
    if (localStorage.getItem('email')) {
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('email');
  }
}
