import { JwtInterceptor } from './auth/jwt.interceptor';
import { ErrorInterceptor } from './auth/error.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';

import { SigninComponent } from './_components/sign/in/signin/signin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LanguageComponent } from './_components/language/language.component';
import { HomeComponent } from './_components/home/home.component';
import { HomeUpdateComponent } from './_components/home-update/home-update.component';
import { ImageDialogComponent } from './_components/image-dialog/image-dialog.component';
import { FileUploadComponent } from './_components/helpers/file-upload/file-upload.component';
import { TranslateComponent } from './_components/helpers/translate/translate.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    LanguageComponent,
    HomeComponent,
    HomeUpdateComponent,
    ImageDialogComponent,
    FileUploadComponent,
    TranslateComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatTabsModule,
    MatDialogModule,
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
