import { AuthGuard } from './auth/auth.guard';
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
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
