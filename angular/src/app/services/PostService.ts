import {Observable, of} from "rxjs";

import {catchError, map, tap} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Post} from "../dtos/post";


@Injectable({ providedIn: 'root' })
export class PostService {

  private url = 'https://lapr5-backend-ns.herokuapp.com/api/posts';  // URL to post api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  createPost(post: Post): Observable<Post> {
    console.log(post)
    return this.http.post<Post>(this.url,post,this.httpOptions).pipe(
      tap(_ => console.log(`created post for the user=${post.userId}`)),
      catchError(this.handleError<any>('created Post')));
  }

  getPostUser(userId: string): Observable<Post[]> {
    const urlFinal = `${this.url}/getPosts/${userId}`;
    return this.http.get<Post[]>(urlFinal,this.httpOptions)
      .pipe(
        tap(_ => console.log('fetched Posts')),
        catchError(this.handleError<Post[]>('getPosts', []))
      );
  }

  giveLike(id: string,idFrontend: string): Observable<any> {
    const url = `${this.url}/giveLike/${id}/${idFrontend}`;
    return this.http.put(url, this.httpOptions).pipe(
      tap(_ => console.log(`updated post like, for post id=${id}`)),
      catchError(this.handleError<any>('giveLike'))
    );
  }

  giveDislike(id: string,idFrontend: string): Observable<any> {
    const url = `${this.url}/giveDislike/${id}/${idFrontend}`;
    return this.http.put(url, this.httpOptions).pipe(
      tap(_ => console.log(`updated post dislike, for post id=${id}`)),
      catchError(this.handleError<any>('giveDislike'))
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
