import {Observable} from "rxjs";

import {map} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Size} from "../dtos/size";

@Injectable({ providedIn: 'root' })
export class networkSizeService {

  private url = 'https://vs-gate.dei.isep.ipp.pt:30817/api/';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  consultNetworkSize(id: string, lvl: string): Observable<any> {
    const url = `${this.url}ConsultNetworkLength?userId=${id}&level=${lvl}`;
    return this.http.get<Size>(url).pipe(map(response => {
      return response
    }));
  }

}
