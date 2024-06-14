import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import { Friendship } from '../dtos/friendship';
import {Observable, of} from "rxjs";
import {User} from "../dtos/user";
import {TagCloud} from "../dtos/tagCloud";

@Injectable({
  providedIn: 'root'
})

export class FriendshipService {

  user: User| undefined;

  private Url = 'https://lapr5backend.azurewebsites.net/api/Friendship';
  private requestFriendsUrl = 'https://lapr5backend.azurewebsites.net/api/FriendRequest';
  private listPendingUrl = 'https://lapr5backend.azurewebsites.net/api/ListPendingFriendshipRequests';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
  }

  /** GET friendships from the server */
  getFriendships(): Observable<Friendship[]> {
    return this.http.get<Friendship[]>(this.Url)
      .pipe(
        tap(_ => console.log('fetched friendships')),
        catchError(this.handleError<Friendship[]>('getFriendship', []))
      );
  }

  /** GET friendship from the server */
  getFriendship(id: string): Observable<Friendship> {
    const url = `${this.Url}/${id}`;
    return this.http.get<Friendship>(url)
      .pipe(
        tap(_ => console.log('fetched friendships')),
        catchError(this.handleError<Friendship>('getFriendship', ))
      );
  }


  /** POST: add a new friendship to the server */
  addFriendship(id: string, name: string): Observable<Friendship> {
    console.log(id);

    const url = `${this.requestFriendsUrl}/${id}/${name}`;

    return this.http.post<Friendship>(url, this.httpOptions).pipe(
      tap((newFriendship: Friendship) => console.log(`added friendship w/ id=${newFriendship.id}`)),
      catchError(this.handleError<Friendship>('addFriendship'))
    );
  }

  /** GET pending friendships from the server */
  listPendingFriendshipRequests(id: string): Observable<Friendship[]> {
    console.log(id);

    const url = `${this.listPendingUrl}/${id}`;

    return this.http.get<Friendship[]>(url, this.httpOptions)
      .pipe(
        tap(_ => console.log(`fetched listPendingFriendshipRequests=${id}`)),
        catchError(this.handleError<Friendship[]>(`listPendingFriendshipRequests=${id}`, []))
      );
  }

  /** GET TagCloud from friendships from the server */
  getTagCloudFromFriendships(): Observable<TagCloud[]> {
    const url = `${this.Url}/TagCloud`;

    return this.http.get<TagCloud[]>(url, this.httpOptions)
      .pipe(
        tap(_ => console.log(`fetched getTagCloudFromFriendships`)),
        catchError(this.handleError<TagCloud[]>(`getTagCloudFromFriendships`, []))
      );
  }

  /** GET TagCloud from user friendships */
  getTagCloudFromUserFriendships(id: string): Observable<TagCloud[]> {
    const url = `${this.Url}/TagCloud/${id}`;

    return this.http.get<TagCloud[]>(url, this.httpOptions)
      .pipe(
        tap(_ => console.log(`fetched getTagCloudFromUserFriendships`)),
        catchError(this.handleError<TagCloud[]>(`getTagCloudFromUserFriendships`, []))
      );
  }

  getRelationshipStrengthBetweenUsers (name: string, id:string) : Observable<string> {

    //const url =  `${this.Url}/RelationStrength/${id}/${name}`;
    const url =  `https://localhost:5001/api/Friendship/RelationStrength/${id}/${name}`;
    return this.http.get<string>(url,this.httpOptions)
      .pipe(
        tap(_ =>console.log(`fetched connectionStrength between two users`)),
        catchError(this.handleError<string>(`getRelationStrengthBetweenUsers`,)));

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
