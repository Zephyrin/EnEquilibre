import { PaginationComponent } from './_components/helpers/pagination/pagination.component';
import { TopErrorsComponent } from './_components/helpers/top-errors/top-errors.component';
import { TheadComponent } from './_components/helpers/remove-dialog/thead.component';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SigninComponent } from './_components/sign/in/signin/signin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LanguageComponent } from './_components/language/language.component';
import { HomeComponent } from './_components/home/home.component';
import { HomeUpdateComponent } from './_components/home-update/home-update.component';
import { ImageDialogComponent } from './_components/image-dialog/image-dialog.component';
import { FileUploadComponent } from './_components/helpers/file-upload/file-upload.component';
import { TranslateComponent } from './_components/helpers/translate/translate.component';
import { RemoveDialogComponent } from './_components/helpers/remove-dialog/remove-dialog.component';
import { TextEditComponent } from './_components/helpers/text-edit/text-edit.component';
import { GalleriesComponent } from './_components/gallery/galleries.component';
import { NewGalleryComponent } from './_components/gallery/new-gallery/new-gallery.component';
import { GalleryComponent } from './_components/gallery/gallery/gallery.component';
import { AboutComponent } from './_components/about/about.component';
import { SignupComponent } from './_components/sign/up/signup/signup.component';
import { ManageUserComponent } from './_components/admin/manage-user/manage-user.component';
import { ManageImageComponent } from './_components/merchant/manage-image/manage-image.component';
import { ContactComponent } from './_components/contact/contact.component';
import { GalleryDesktopComponent } from './_components/gallery/gallery-desktop/gallery-desktop.component';
import { ImageFullHeightComponent } from './_components/image/image-full-height/image-full-height.component';
import { ImageTitleComponent } from './_components/image/image-title/image-title.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    LanguageComponent,
    HomeComponent,
    HomeUpdateComponent,
    ImageDialogComponent,
    FileUploadComponent,
    TranslateComponent,
    RemoveDialogComponent,
    TextEditComponent,
    GalleriesComponent,
    NewGalleryComponent,
    GalleryComponent,
    AboutComponent,
    SignupComponent,
    ManageUserComponent,
    TheadComponent,
    TopErrorsComponent,
    PaginationComponent,
    ManageImageComponent,
    ContactComponent,
    GalleryDesktopComponent,
    ImageFullHeightComponent,
    ImageTitleComponent
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
    MatProgressSpinnerModule,
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
