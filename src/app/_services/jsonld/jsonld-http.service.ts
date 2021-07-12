import { JSonLD } from '@app/_models/jsonld';
import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { LanguageService } from '..';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class JSonLDHttpService extends HttpService<JSonLD> {

  constructor(private http: HttpClient, private language: LanguageService) {
    super();
  }

  getMerchant(page: string): Observable<JSonLD> {
    return this.http.get<JSonLD>(
      `${environment.apiUrl}/${this.language.language}/${page}/jsonld`);
  }

  getAllMerchant(httpParams: HttpParams): Observable<HttpResponse<JSonLD[]>> {
    return this.http.get<JSonLD[]>(
      `${environment.apiUrl}/jsonlds`,
      { params: httpParams, observe: 'response' });
  }

  getAll(httpParams: HttpParams): Observable<HttpResponse<JSonLD[]>> {
    return this.http.get<JSonLD[]>(
      `${environment.apiUrl}/jsonlds`,
      { params: httpParams, observe: 'response' });
  }

  get(page: string): Observable<JSonLD> {
    return this.http.get<JSonLD>(
      `${environment.apiUrl}/${page}/jsonld`);
  }

  create(jsonLD: JSonLD): Observable<JSonLD> {
    return this.http.post<JSonLD>(
      `${environment.apiUrl}/${this.language.language}/${jsonLD.id}/jsonld`, jsonLD)
      .pipe(map(retMediaobject => {
        return retMediaobject;
      }));
  }

  update(page: string, jsonLD: JSonLD): Observable<JSonLD> {
    return this.http.patch<JSonLD>(
      `${environment.apiUrl}/${this.language.language}/${page}/jsonld`, jsonLD);
  }

  delete(jsonLD: JSonLD): Observable<{}> {
    return this.http.delete(
      `${environment.apiUrl}/${this.language.language}/${jsonLD.id}/jsonld`)
      .pipe(
        catchError(this.handleError)
      );
  }
}
