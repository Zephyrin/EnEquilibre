import { LanguageService } from '../language.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { HttpService } from '@app/_services/http.service';

@Injectable({ providedIn: 'root' })
export class UserHttpService extends HttpService<User> {

  constructor(
    private http: HttpClient,
    private language: LanguageService) {
    super();
  }

  getAll(httpParams: HttpParams): Observable<HttpResponse<User[]>> {
    return this.http.get<User[]>(
      `${environment.apiUrl}/${this.language.language}/users`
      , { params: httpParams, observe: 'response' });
  }

  getMerchant(id: string): Observable<User> {
    throw new Error('Method not implemented.');
  }
  getAllMerchant(httpParams: HttpParams): Observable<HttpResponse<User[]>> {
    throw new Error('Method not implemented.');
  }

  update(id: string, user: User): Observable<User> {
    return this.http.patch<User>(
      `${environment.apiUrl}/${this.language.language}/user/${id}`, user)
      ;
  }

  delete(user: User): Observable<{}> {
    return this.http.delete(
      `${environment.apiUrl}/${this.language.language}/user/${user.id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  create(user: User): Observable<User> {
    return null;
  }

  get(id: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/${this.language.language}/user/${id}`);
  }
}
