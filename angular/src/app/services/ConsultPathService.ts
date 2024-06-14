import {Observable} from "rxjs";
import {Path} from "../dtos/path";
import {map} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class ConsultPathService {

  private userUrl = 'https://vs-gate.dei.isep.ipp.pt:30817/api/';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  consultSafestPath(orig: string, dest: string, min: string): Observable<any> {
    const url = `${this.userUrl}ConsultSafestPath?nameOrig=${orig}&nameDest=${dest}&minimum=${min}`;
    return this.http.get<Path>(url).pipe(map(response => {
      return response
    }));
  }

  consultSafestPathMulti(orig: string, dest: string, min: string): Observable<any> {
    const url = `${this.userUrl}ConsultSafestPathMulti?nameOrig=${orig}&nameDest=${dest}&minimum=${min}`;
    return this.http.get<Path>(url).pipe(map(response => {
      return response
    }));
  }

  consultShortestPath(orig: string, dest: string): Observable<any> {
    const url = `${this.userUrl}ConsultShortestPath?nameOrig=${orig}&nameDest=${dest}`;
    return this.http.get<Path>(url).pipe(map(response => {
      return response
    }));
  }

  consultStrongestPath(orig: string, dest: string): Observable<any> {
    const url = `${this.userUrl}ConsultStrongestPath?nameOrig=${orig}&nameDest=${dest}`;
    return this.http.get<Path>(url).pipe(map(response => {
      return response
    }));
  }

  consultStrongestPathMulti(orig: string, dest: string): Observable<any> {
    const url = `${this.userUrl}ConsultStrongestPathMulti?nameOrig=${orig}&nameDest=${dest}`;
    return this.http.get<Path>(url).pipe(map(response => {
      return response
    }));
  }
}
