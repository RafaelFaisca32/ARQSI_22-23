import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {Introduction} from "../dtos/introduction";
import {Friendship} from "../dtos/friendship";
import {IntroductionNames} from "../dtos/introductionNames";

@Injectable({
  providedIn: 'root'
})

export class IntroductionService {

  private Url = 'https://lapr5backend.azurewebsites.net/api/IntroductionRequest';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
  }

  /** POST: add a new introduction to the server */
  addIntroduction(introduction:Introduction): Observable<Introduction> {
    return this.http.post<Introduction>(this.Url, introduction,this.httpOptions).pipe(
      tap((newIntroduction: Introduction) => console.log(`added Introduction w/ requesterId=${newIntroduction.requester}`)),
      catchError(this.handleError<Introduction>('addIntroduction'))
    );
  }

  /** PUT: update the hero on the server */
  acceptIntroductionRequest(introductionId: string): Observable<any> {
    const url = `${this.Url}/${introductionId}/accept`;

    return this.http.put(url, this.httpOptions).pipe(
      tap(_ => console.log(`updated introduction id=${introductionId}`)),
      catchError(this.handleError<any>('updateIntroduction'))
    );
  }

  /** PUT: update the hero on the server */
  rejectIntroductionRequest(introductionId: string): Observable<any> {
    const url = `${this.Url}/${introductionId}/reject`;

    return this.http.put(url, this.httpOptions).pipe(
      tap(_ => console.log(`updated introduction id=${introductionId}`)),
      catchError(this.handleError<any>('updateIntroduction'))
    );
  }

  /** GET pending introductions from user */
  getPendingIntroductionRequestsFromUser(id: string): Observable<IntroductionNames[]> {
    console.log(id);

    const url = `${this.Url}/pending/${id}`;

    return this.http.get<IntroductionNames[]>(url, this.httpOptions)
      .pipe(
        tap(_ => console.log(`fetched listPendingIntroductionRequests=${id}`)),
        catchError(this.handleError<IntroductionNames[]>(`listPendingIntroductionRequests=${id}`, []))
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
