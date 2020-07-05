import { ViewTranslateService } from './_services';
import { Role } from './_enums/role.enum';
import { Router } from '@angular/router';
import { map, shareReplay } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from './_services';
import { User } from './_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentUser: User;
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public router: Router,
    private authenticationService: AuthenticationService,
    public vt: ViewTranslateService
  ) {
    this.authenticationService.currentUser.subscribe(
      x => this.currentUser = x);
  }
  ngOnInit(): void {

  }

  get isAdmin() {
    return this.currentUser
      && this.currentUser.roles
      && (this.currentUser.roles.indexOf(Role.Admin) !== -1
        || this.currentUser.roles.indexOf(Role.SuperAdmin) !== -1);
  }

  get isMerchant() {
    return this.currentUser
      && this.currentUser.roles
      && (this.currentUser.roles.indexOf(Role.Merchant) !== -1
        || this.currentUser.roles.indexOf(Role.Admin) !== -1
        || this.currentUser.roles.indexOf(Role.SuperAdmin) !== -1);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
