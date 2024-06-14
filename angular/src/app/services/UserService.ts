import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {User} from "../dtos/user";
import {TagCloud} from "../dtos/tagCloud";


@Injectable({providedIn: 'root'})
export class UserService {

  private userUrl = 'https://lapr5backend.azurewebsites.net/api/User';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  /** GET heroes from the server */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl)
      .pipe(
        tap(_ => console.log('fetched users')),
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }


  /** GET hero by id. Return `undefined` when id not found */
  getUserNo404<Data>(id: number): Observable<User> {
    const url = `${this.userUrl}/${id}`;
    console.log(url);
    return this.http.get<User[]>(url)
      .pipe(
        map(users => users[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          console.log(`${outcome} user id=${id}`);
        }),
        catchError(this.handleError<User>(`getUser id=${id}`))
      );
  }

  /** GET network strength of an user from the server */
  getNetworkStrength(id: string): Observable<number> {
    const url = `${this.userUrl}/NetworkStrength/${id}`;
    return this.http.get<number>(url)
      .pipe(
        tap(_ => console.log('geting network strength')),
        catchError(this.handleError<number>('getNetworkStrength',))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getUser(id: string): Observable<User> {
    const url = `${this.userUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => console.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  getUserByEmail(email: string): Observable<User> {
    const url = `${this.userUrl}/Posts/${email}`;
    return this.http.get<User>(url).pipe(
      tap(_ => console.log(`fetched user email=${email}`)),
      catchError(this.handleError<User>(`getUser email=${email}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<User[]>(`${this.userUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        console.log(`found users matching "${term}"`) :
        console.log(`no users matching "${term}"`)),
      catchError(this.handleError<User[]>('searchUsers', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user, this.httpOptions).pipe(answer => { return answer });
  }

  /** PUT: update the hero on the server */
  updateUser(user: User): Observable<any> {
    return this.http.put(this.userUrl, user, this.httpOptions).pipe(
      tap(_ => console.log(`updated hero id=${user.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  updateMood(id: string, newMood: string): Observable<any> {
    const url1 = 'https://lapr5backend.azurewebsites.net/api/ChangeMood/';
    const url = `${url1}${id}/${newMood}`;
    return this.http.put(url, this.httpOptions).pipe(
      tap(_ => console.log(`updated user mood, for user id=${id}`)),
      catchError(this.handleError<any>('updateMood'))
    );
  }

  updateProfile(user: User): Observable<any> {
    const url1 = 'https://lapr5backend.azurewebsites.net/api/ChangeProfile/';
    const url = `${url1}${user.id}`;
    return this.http.put(url, user, this.httpOptions).pipe(
      tap(_ => console.log(`updated user profile, for user id=${user.id}`)),
      catchError(this.handleError<any>('updateProfile'))
    );
  }

  networkLength(): Observable<number>{
    const url = 'https://lapr5backend.azurewebsites.net/api/NetworkLength';
    return this.http.get<number>(url)
      .pipe(
        tap(_ => console.log('fetched network length')),
        catchError(this.handleError<number>('getNetworkLength',0))
      );
  }
  /** GET TagCloud from users from the server */
  getTagCloudFromUsers(): Observable<TagCloud[]> {
    const url = `${this.userUrl}/TagCloud`;

    return this.http.get<TagCloud[]>(url, this.httpOptions)
      .pipe(
        tap(_ => console.log(`fetched getTagCloudFromUsers`)),
        catchError(this.handleError<TagCloud[]>(`getTagCloudFromUsers`, []))
      );
  }

  /** GET TagCloud from users from the server */
  getTagCloudFromUser(id: string): Observable<TagCloud[]> {
    const url = `${this.userUrl}/TagCloud/${id}`;

    return this.http.get<TagCloud[]>(url, this.httpOptions)
      .pipe(
        tap(_ => console.log(`fetched getTagCloudFromUser`)),
        catchError(this.handleError<TagCloud[]>(`getTagCloudFromUser`, []))
      );
  }

  deactivateAccount(id: string): Observable<any> {
    const url = `${this.userUrl}/${id}`;
    return this.http.delete(url,this.httpOptions) .pipe(
      tap(_ => console.log(`soft deleted`)),
      catchError(this.handleError<TagCloud[]>(`deactivateAccount`, []))
    );
  }

  deleteAccount(id: string): Observable<any> {
    const url = `${this.userUrl}/${id}/hard`;
    return this.http.delete(url,this.httpOptions) .pipe(
      tap(_ => console.log(`deleted`)),
      catchError(this.handleError<TagCloud[]>(`deleteAccount`, []))
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
