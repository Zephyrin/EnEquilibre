import { DesignerCircleComponent } from './_components/designer-circle/designer-circle.component';
import { EventsComponent } from './_components/events/events.component';
import { ShopComponent } from './_components/shop/shop.component';
import { ContactComponent } from './_components/contact/contact.component';
import { Role } from './_enums/role.enum';
import { AuthGuard } from './auth/auth.guard';
import { ManageImageComponent } from './_components/merchant/manage-image/manage-image.component';
import { ManageUserComponent } from './_components/admin/manage-user/manage-user.component';
import { SignupComponent } from './_components/sign/up/signup/signup.component';
import { AboutComponent } from './_components/about/about.component';
import { VerticalGalleriesComponent } from './_components/galleries/vertical/vertical-galleries.component';
import { HomeComponent } from './_components/home/home.component';
import { SigninComponent } from './_components/sign/in/signin/signin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';


const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  useHash: false,
  onSameUrlNavigation: 'reload',
  scrollPositionRestoration: 'enabled',
  scrollOffset: [0, 0],
};

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'galleries', component: VerticalGalleriesComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'manage-user', component: ManageUserComponent, canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.SuperAdmin] }
  },
  {
    path: 'manage-image', component: ManageImageComponent, canActivate: [AuthGuard],
    data: { roles: [Role.Merchant, Role.Admin, Role.SuperAdmin] }
  },
  { path: 'shop', component: ShopComponent },
  { path: 'events', component: EventsComponent },
  { path: 'designerCircle', component: DesignerCircleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
