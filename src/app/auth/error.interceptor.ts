import { Router } from '@angular/router';
import { LanguageService } from './../_services/language.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '@app/_services';
import { environment } from '@environments/environment';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private language: LanguageService,
    private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        if (err.url === `${environment.apiUrl}/${this.language.language}/viewtranslate`) {
          // auto logout if 401 response returned from api
          this.authenticationService.logout();
          this.router.navigate(['/signin']);
        } else if (err.url === `${environment.apiUrl}/${this.language.language}/auth/login_check`) {

        } else {
          this.authenticationService.logout();
          location.reload();
        }
      }
      return throwError(err);
    }));
  }
}
