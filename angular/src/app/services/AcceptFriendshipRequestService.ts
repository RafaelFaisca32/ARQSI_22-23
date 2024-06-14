import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AcceptFriendshipRequestService {

  private Url = 'https://lapr5backend.azurewebsites.net/api/Friendship';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
  }

  /** PUT: accept friendship */
  acceptFriendshipRequest(id: string): Observable<any> {
    console.log(id);

    const url = `${this.Url}/${id}/accept`;

    return this.http.put(url, this.httpOptions).pipe(
      tap(_ => console.log(`accepted friendship=${id}`)),
      catchError(this.handleError<any>('acceptFriendshipRequest'))
    );
  }

  /** PUT: reject friendship */
  rejectFriendshipRequest(id: string): Observable<any> {
    console.log(id);

    const url = `${this.Url}/${id}/reject`;

    return this.http.put(url, this.httpOptions).pipe(
      tap(_ => console.log(`rejected friendship=${id}`)),
      catchError(this.handleError<any>('rejectFriendshipRequest'))
    );
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
