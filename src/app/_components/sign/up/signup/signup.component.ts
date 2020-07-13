import { ViewTranslateService } from './../../../../_services/view-translate.service';
import { AuthenticationService } from './../../../../_services/authentication.service';
import { Router } from '@angular/router';
import { FormErrors } from './../../../../_helpers/form-error';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '@app/_models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {

  @ViewChild('login') loginElement: ElementRef;
  @ViewChild('email') emailElement: ElementRef;
  @ViewChild('gender') genderElement: ElementRef;
  @ViewChild('password') passwordElement: ElementRef;

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  errors = new FormErrors();

  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    public vt: ViewTranslateService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }

  }

  ngAfterViewInit(): void {
    this.setFocus();
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.setFocus();
      return;
    }

    this.loading = true;
    this.authenticationService.signup(new User(this.registerForm.value))
      .subscribe(
        data => {
          this.authenticationService.getUser(this.f.username.value, data).subscribe(x => {
            this.loading = false;
            this.router.navigate(['/']);
          }, error => {
            this.manageError(error);
          });
        },
        error => {
          this.manageError(error);
        });
  }

  manageError(error) {
    this.errors.formatError(error, this.registerForm.controls);
    this.setFocus();
    this.loading = false;
  }

  hasError(name: string) {
    return this.submitted && this.f[name].errors && !this.errors.hasErrors[name];
  }

  serverError(name: string) {
    if (this.submitted && this.errors.hasErrors[name]) {
      return true;
    }
    return false;
  }

  private setFocus() {
    setTimeout(() => {
      if (this.f.username.invalid) {
        this.loginElement.nativeElement.focus();
      } else if (this.f.email.invalid) {
        this.emailElement.nativeElement.focus();
      } else if (this.f.gender.invalid) {
        this.genderElement.nativeElement.focus();
      } else if (this.f.password.invalid) {
        this.passwordElement.nativeElement.focus();
      } else {
        this.loginElement.nativeElement.focus();
      }
    }, 1);
  }
}
