import { HttpParams, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

export abstract class HttpService<T> {

  abstract getAll(httpParams: HttpParams): Observable<HttpResponse<T[]>>;

  abstract update(id: string, elt: T): Observable<T>;

  abstract delete(elt: T): Observable<{}>;

  abstract create(elt: T): Observable<T>;

  abstract get(id: string): Observable<T>;

  abstract getMerchant(id: string): Observable<T>;

  abstract getAllMerchant(httpParams: HttpParams): Observable<HttpResponse<T[]>>;

  handleError(error: any) {
    if (error instanceof String
      || typeof (error) === 'string') {
      console.error(error);
    } else if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }
}
