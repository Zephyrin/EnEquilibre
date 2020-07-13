import { LanguageService } from '../language.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Home } from '@app/_models';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class HomeHttpService extends HttpService<Home> {

  constructor(private http: HttpClient, private language: LanguageService) {
    super();
  }

  get(key: string): Observable<Home> {
    return this.http.get<Home>(
      `${environment.apiUrl}/${this.language.language}/home`
    );
  }

  getAll(httpParams: HttpParams = null): Observable<HttpResponse<Home[]>> {
    return this.http.get<Home[]>(
      `${environment.apiUrl}/${this.language.language}/homes`,
      { params: httpParams, observe: 'response' });
  }

  getMerchant(id: string): Observable<Home> {
    return this.http.get<Home>(
      `${environment.apiUrl}/home`
    );
  }

  getAllMerchant(httpParams: HttpParams = null): Observable<HttpResponse<Home[]>> {
    return this.http.get<Home[]>(
      `${environment.apiUrl}/homes`,
      { params: httpParams, observe: 'response' });
  }

  create(home: Home): Observable<Home> {
    return this.http.post<Home>(
      `${environment.apiUrl}/${this.language.language}/home`, home);
  }

  update(id: string, home: Home): Observable<Home> {
    return this.http.patch<Home>(
      `${environment.apiUrl}/${this.language.language}/home`, home)
      ;
  }

  delete(home: Home): Observable<{}> {
    return this.http.delete(
      `${environment.apiUrl}/${this.language.language}/home`)
      .pipe(
        catchError(this.handleError)
      );
  }
}
