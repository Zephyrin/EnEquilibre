import { FormErrors } from './../../_helpers/form-error';
import { Mediaobject } from './../../_models/mediaobject';
import { Role } from './../../_enums/role.enum';
import { User } from './../../_models/user';
import { AuthenticationService } from './../authentication.service';
import { HomeHttpService } from './home-http.service';
import { Injectable } from '@angular/core';
import { Home } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  currentUser: User;
  public home: Home;
  public loading = false;
  public errors = new FormErrors();
  public set edit(edit: boolean) {
    if (edit) {
      if (!(this.currentUser
        && this.currentUser.roles
        && (this.currentUser.roles.indexOf(Role.Merchant) !== -1
          || this.currentUser.roles.indexOf(Role.Admin) !== -1
          || this.currentUser.roles.indexOf(Role.SuperAdmin) !== -1))) {
        return;
      }
    }
    this.edit$ = edit;
    if (this.edit$) {
      this.http.getMerchant('').subscribe(data => {
        this.home = new Home(data);
      }, err => {
        this.home = new Home();
      });
    } else {
      this.http.get('').subscribe(data => {
        this.home = new Home(data);
      }, err => {
        this.home = new Home();
      });
    }
  }
  public get edit() { return this.edit$; }
  private edit$ = false;

  public get canEdit() {
    return this.currentUser
      && this.currentUser.roles
      && (this.currentUser.roles.indexOf(Role.Merchant) !== -1
        || this.currentUser.roles.indexOf(Role.Admin) !== -1
        || this.currentUser.roles.indexOf(Role.SuperAdmin) !== -1);
  }

  constructor(private http: HomeHttpService, private authenticationService: AuthenticationService) {
    this.edit = false;
    this.authenticationService.currentUser.subscribe(
      x => { this.currentUser = x; this.edit = true; });
  }

  public updateBackground(mediaObject: Mediaobject): void {
    this.start();
    this.home.background = mediaObject;
    this.updateOrCreate();
  }

  private start() {
    this.loading = true;
    this.errors = new FormErrors();
  }

  private end(error?: any | undefined) {
    this.loading = false;
    if (error) {
      this.errors.formatError(error);
    }
  }

  private updateOrCreate() {
    if (this.home.id === undefined) {
      this.http.create(this.home).subscribe(data => {
        this.home.id = data.id;
        this.end();
      }, error => {
        this.end(error);
      });
    } else {
      this.http.update(this.home).subscribe(data => {
        this.end();
      }, error => {
        this.end(error);
      });
    }
  }
}
