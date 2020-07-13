import { LanguageService } from '../language.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { About } from '@app/_models';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class AboutHttpService extends HttpService<About> {

  constructor(private http: HttpClient, private language: LanguageService) {
    super();
  }

  get(key: string): Observable<About> {
    return this.http.get<About>(
      `${environment.apiUrl}/${this.language.language}/about`
    );
  }

  getAll(httpParams: HttpParams = null): Observable<HttpResponse<About[]>> {
    return this.http.get<About[]>(
      `${environment.apiUrl}/${this.language.language}/abouts`,
      { params: httpParams, observe: 'response' });
  }

  getMerchant(id: string): Observable<About> {
    return this.http.get<About>(
      `${environment.apiUrl}/about`
    );
  }

  getAllMerchant(httpParams: HttpParams = null): Observable<HttpResponse<About[]>> {
    return this.http.get<About[]>(
      `${environment.apiUrl}/abouts`,
      { params: httpParams, observe: 'response' });
  }

  create(about: About): Observable<About> {
    return this.http.post<About>(
      `${environment.apiUrl}/${this.language.language}/about`, about);
  }

  update(id: string, about: About): Observable<About> {
    return this.http.patch<About>(
      `${environment.apiUrl}/${this.language.language}/about`, about)
      ;
  }

  delete(about: About): Observable<{}> {
    return this.http.delete(
      `${environment.apiUrl}/${this.language.language}/about`)
      .pipe(
        catchError(this.handleError)
      );
  }
}
