import { LanguageService } from './../language.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Mediaobject } from '@app/_models';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class MediaobjectHttpService extends HttpService<Mediaobject>{

  constructor(private http: HttpClient, private language: LanguageService) {
    super();
  }

  getMerchant(id: string): Observable<Mediaobject> {
    return this.http.get<Mediaobject>(
      `${environment.apiUrl}/mediaobject/${id}`);
  }
  getAllMerchant(httpParams: HttpParams): Observable<HttpResponse<Mediaobject[]>> {
    return this.http.get<Mediaobject[]>(
      `${environment.apiUrl}/mediaobjects`,
      { params: httpParams, observe: 'response' });
  }

  getAll(httpParams: HttpParams): Observable<HttpResponse<Mediaobject[]>> {
    return this.http.get<Mediaobject[]>(
      `${environment.apiUrl}/mediaobjects`,
      { params: httpParams, observe: 'response' });
  }

  get(id: string): Observable<Mediaobject> {
    return this.http.get<Mediaobject>(
      `${environment.apiUrl}/${this.language.language}/mediaobject/${id}`);
  }

  create(mediaobject: Mediaobject): Observable<Mediaobject> {
    return this.http.post<Mediaobject>(
      `${environment.apiUrl}/${this.language.language}/mediaobject`, mediaobject)
      .pipe(map(retMediaobject => {
        return retMediaobject;
      }));
  }

  update(id: string, mediaobject: Mediaobject): Observable<Mediaobject> {
    return this.http.patch<Mediaobject>(
      `${environment.apiUrl}/${this.language.language}/mediaobject/${id}`, mediaobject);
  }

  delete(mediaobject: Mediaobject): Observable<{}> {
    return this.http.delete(
      `${environment.apiUrl}/${this.language.language}/mediaobject/${mediaobject.id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
}
