import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {User} from "../dtos/user";

@Injectable({
  providedIn: 'root'
})

export class SugestedFriendsService {
  user:User| undefined;


  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {}

 sugestedUsers(id:string):Observable<any>{
    const url1 = 'https://lapr5backend.azurewebsites.net/api/SugestedFriendships';
    const url =  `${url1}/${id}`;

    return this.http.get(url,this.httpOptions).pipe(
      tap(_=>console.log(`sugested friendships=${id}`)),
      catchError(this.handleError<any>('sugestedFriendships')));

  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
