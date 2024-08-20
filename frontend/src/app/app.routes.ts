import { Route } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuctionViewPageComponent } from './components/pages/auction-view-page/auction-view-page.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ProfilePageComponent } from './components/pages/profile-page/profile-page.component';
import { RegisterComponent } from './components/register/register.component';
import { SaleCertificatePageComponent } from './components/pages/sale-certificate-page/sale-certificate-page.component';
import { AuthGuard } from './guards/auth.guard';
import { PublicGuard } from './guards/public.guard';

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
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [AuthGuard],
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
