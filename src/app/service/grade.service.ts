import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Grade} from "../model/grade";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  constructor(private _http: HttpClient) { }

  getAll(): Observable<Grade[]> {
    return this._http.get<Grade[]>(environment.baseUrl)
  }

  delete(id: string) {
    return this._http.delete<any>(environment.baseUrl + '/' + id);
  }

  add(minPercentage: number, symbolicGrade: string) {
    return this._http.post<any>(environment.baseUrl, {minPercentage, symbolicGrade})
  }
}
