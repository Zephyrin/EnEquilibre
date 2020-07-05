import { LanguageService } from './language.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { ViewTranslate } from '@app/_models';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ViewTranslateHttpService extends HttpService<ViewTranslate> {

  constructor(private http: HttpClient, private language: LanguageService) {
    super();
  }

  get(key: string): Observable<ViewTranslate> {
    return this.http.get<ViewTranslate>(
      `${environment.apiUrl}/${this.language.language}/viewtranslate/${key}`
    );
  }

  getAll(httpParams: HttpParams = null): Observable<HttpResponse<ViewTranslate[]>> {
    return this.http.get<ViewTranslate[]>(
      `${environment.apiUrl}/${this.language.language}/viewtranslates`,
      { params: httpParams, observe: 'response' });
  }

  create(viewtranslate: ViewTranslate): Observable<ViewTranslate> {
    return this.http.post<ViewTranslate>(
      `${environment.apiUrl}/${this.language.language}/viewtranslate`, viewtranslate);
  }

  update(viewtranslate: ViewTranslate): Observable<ViewTranslate> {
    return this.http.patch<ViewTranslate>(
      `${environment.apiUrl}/${this.language.language}/viewtranslate/${viewtranslate.key}`, viewtranslate)
      ;
  }

  delete(viewtranslate: ViewTranslate): Observable<{}> {
    return this.http.delete(
      `${environment.apiUrl}/${this.language.language}/viewtranslate/${viewtranslate.key}`)
      .pipe(
        catchError(this.handleError)
      );
  }
}
