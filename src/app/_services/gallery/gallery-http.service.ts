import { LanguageService } from '../language.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Gallery } from '@app/_models';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class GalleryHttpService extends HttpService<Gallery> {

  constructor(private http: HttpClient, private language: LanguageService) {
    super();
  }

  get(id: string): Observable<Gallery> {
    return this.http.get<Gallery>(
      `${environment.apiUrl}/${this.language.language}/gallery/${id}`
    );
  }

  getAll(httpParams: HttpParams = null): Observable<HttpResponse<Gallery[]>> {
    return this.http.get<Gallery[]>(
      `${environment.apiUrl}/${this.language.language}/galleries`,
      { params: httpParams, observe: 'response' });
  }

  getMerchant(id: string): Observable<Gallery> {
    return this.http.get<Gallery>(
      `${environment.apiUrl}/gallery/${id}`
    );
  }

  getAllMerchant(httpParams: HttpParams = null): Observable<HttpResponse<Gallery[]>> {
    return this.http.get<Gallery[]>(
      `${environment.apiUrl}/galleries`,
      { params: httpParams, observe: 'response' });
  }

  create(gallery: Gallery): Observable<Gallery> {
    return this.http.post<Gallery>(
      `${environment.apiUrl}/${this.language.language}/gallery`, gallery);
  }

  update(id: string, gallery: Gallery): Observable<Gallery> {
    return this.http.patch<Gallery>(
      `${environment.apiUrl}/${this.language.language}/gallery/${id}`, gallery)
      ;
  }

  delete(gallery: Gallery): Observable<{}> {
    return this.http.delete(
      `${environment.apiUrl}/${this.language.language}/gallery/${gallery.id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
}
