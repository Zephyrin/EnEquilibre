import { ManageImageComponent } from './_components/merchant/manage-image/manage-image.component';
import { ManageUserComponent } from './_components/admin/manage-user/manage-user.component';
import { SignupComponent } from './_components/sign/up/signup/signup.component';
import { AboutComponent } from './_components/about/about.component';
import { GalleriesComponent } from './_components/gallery/galleries.component';
import { HomeComponent } from './_components/home/home.component';
import { SigninComponent } from './_components/sign/in/signin/signin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'galleries', component: GalleriesComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'about', component: AboutComponent },
  { path: 'manage-user', component: ManageUserComponent },
  { path: 'manage-image', component: ManageImageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
