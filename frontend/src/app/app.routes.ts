import { Route } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { PublicGuard } from './guards/public.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { AuctionFormComponent } from './components/auctions/auction-form/auction-form.component';
import { AuctionComponent } from './components/auctions/auction/auction.component';
import { SaleCertificatePageComponent } from './components/sale-certificate-page/sale-certificate-page.component';
import { AuctionViewPageComponent } from './components/pages/auction-view-page/auction-view-page.component';

export const appRoutes: Route[] = [
  { path: 'login', component: LoginComponent, canActivate: [PublicGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [PublicGuard],
  },
  {
    path: 'sale-certificates',
    component: SaleCertificatePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auction/:id',
    component: AuctionViewPageComponent,
    canActivate: [AuthGuard],
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
