import {Observable, of} from "rxjs";

import {catchError, map, tap} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Comment} from "../dtos/comment";


@Injectable({ providedIn: 'root' })
export class CommentService {

  private url = 'https://lapr5-backend-ns.herokuapp.com/api/comments';  // URL to post api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  createComment(comment: Comment,postId: string): Observable<Comment> {
    const urlFinal = `${this.url}/${postId}`;
    return this.http.post<Comment>(urlFinal,comment,this.httpOptions).pipe(
      tap(_ => console.log(`created comment from the user=${comment.userId}`)),
      catchError(this.handleError<any>('created Post')));
  }

  getComments(postId: string): Observable<Comment[]> {
    const urlFinal = `${this.url}/getComments/${postId}`;
    return this.http.get<Comment[]>(urlFinal,this.httpOptions)
      .pipe(
        tap(_ => console.log('fetched Comment')),
        catchError(this.handleError<Comment[]>('getComments', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
