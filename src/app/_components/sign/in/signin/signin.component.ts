import { filter } from 'rxjs/operators';
import { ViewTranslateService } from './../../../../_services/view-translate.service';
import { FormErrors } from './../../../../_helpers/form-error';
import { AuthenticationService } from './../../../../_services/authentication.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('login') loginElement: ElementRef;
  @ViewChild('password') passwordElement: ElementRef;

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  returnUrlQuery: string;
  error = new FormErrors();
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    public vt: ViewTranslateService
  ) {
  }
  ngAfterViewInit(): void {
    this.setFocus();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams[`returnUrl`] || '/';
    const index = this.returnUrl.indexOf('#');
    if (index >= 0) {
      this.returnUrlQuery = this.returnUrl.substring(index + 1);
      this.returnUrl = this.returnUrl.substring(0, index);
    } else { this.returnUrlQuery = undefined; }

    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate([this.returnUrl], { fragment: this.returnUrlQuery });
    }
  }

  ngOnDestroy() {
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.error = new FormErrors();
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.setFocus();
      return;
    }

    this.loading = true;
    this.authenticationService.login(
      this.f.username.value,
      this.f.password.value)
      .subscribe(
        x => {
          this.authenticationService.getUser(this.f.username.value, x).subscribe(data => {
            this.loading = false;
            this.router.navigate([this.returnUrl], { fragment: this.returnUrlQuery });
          }, error => {
            this.manageError(error);
          });
        }, (error: any) => {
          this.manageError(error);
        });
  }

  manageError(error: any) {
    this.error.formatError(error, this.f);
    this.loading = false;
    this.setFocus();
  }

  private setFocus() {
    setTimeout(() => {
      if (this.f.username.invalid) {
        this.loginElement.nativeElement.focus();
      } else if (this.f.password.invalid) {
        this.passwordElement.nativeElement.focus();
      } else { this.loginElement.nativeElement.focus(); }
    }, 1);
  }
}
