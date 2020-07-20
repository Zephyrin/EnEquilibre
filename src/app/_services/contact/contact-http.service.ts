import { LanguageService } from '../language.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Contact } from '@app/_models';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class ContactHttpService extends HttpService<Contact> {

  constructor(private http: HttpClient, private language: LanguageService) {
    super();
  }

  get(key: string): Observable<Contact> {
    return this.http.get<Contact>(
      `${environment.apiUrl}/${this.language.language}/contact`
    );
  }

  getAll(httpParams: HttpParams = null): Observable<HttpResponse<Contact[]>> {
    return undefined;
  }

  getMerchant(id: string): Observable<Contact> {
    return this.http.get<Contact>(
      `${environment.apiUrl}/contact`
    );
  }

  getAllMerchant(httpParams: HttpParams = null): Observable<HttpResponse<Contact[]>> {
    return undefined;
  }

  create(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(
      `${environment.apiUrl}/${this.language.language}/contact`, contact);
  }

  update(id: string, contact: Contact): Observable<Contact> {
    return this.http.patch<Contact>(
      `${environment.apiUrl}/${this.language.language}/contact`, contact)
      ;
  }

  delete(contact: Contact): Observable<{}> {
    return this.http.delete(
      `${environment.apiUrl}/${this.language.language}/contact`)
      .pipe(
        catchError(this.handleError)
      );
  }
}
