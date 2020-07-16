import { Role } from './_enums/role.enum';
import { AuthGuard } from './auth/auth.guard';
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
  {
    path: 'manage-user', component: ManageUserComponent, canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.SuperAdmin] }
  },
  {
    path: 'manage-image', component: ManageImageComponent, canActivate: [AuthGuard],
    data: { roles: [Role.Merchant, Role.Admin, Role.SuperAdmin] }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
